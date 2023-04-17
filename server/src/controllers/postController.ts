import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import sharp from 'sharp';
import { prisma, redis, s3Client } from '..';

//crypto is built in node interface
const randomImageName = () => crypto.randomUUID().toString();

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //response time went from 379ms - 6ms
    // const cachedPosts = await redis.get(`feed-${req.session.userId}`);
    // if (cachedPosts) return res.status(200).json(JSON.parse(cachedPosts));
    //maybe store everything except url in cache, make a seperate request for the URL
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        desc: true,
        image_name: true,
        image_url: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            id: true,
            name: true,
            profile_pic: true,
          },
        },
      },
      where: {
        OR: [
          {
            user: {
              //grabbing all posts from 'followed' relation in which the follower is the current user
              followed: {
                some: {
                  follower_user_id: req.session.userId,
                },
              },
            },
          },
          {
            user_id: req.session.userId,
          },
        ],
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    for (const post of posts) {
      // For each post, generate a signed URL and save it to the post object
      if (post.image_name) {
        const getObjectParams = {
          Bucket: process.env.BUCKET_NAME,
          Key: post.image_name,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3Client, command, {
          expiresIn: 3600 /*1 hour */,
        });
        post.image_url = url;
        // await prisma.post.update({
        //   where: {
        //     id: post.id,
        //   },
        //   data: {
        //     image_url: url,
        //   },
        // });
      }
    }

    //redis.set(key(must be a string), value, EX (for expiration), expiration time in seconds)
    // redis.set(`feed-${req.session.userId}`, JSON.stringify(posts), 'EX', 3600);
    res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

export const addPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { desc, img } = req.body;
  const { desc } = req.body;
  const { file } = req;
  console.log('FILE WITH NO FILE: ', file);
  const image_name = file?.originalname + randomImageName();
  const formatedBuffer = await sharp(file?.buffer)
    .resize({ height: 1920, width: 1080, fit: 'contain' })
    .toBuffer();

  //25:16 --> make sure to account for if user doesnt input a file later, jsut using if(file) wasn't working
  const s3Params = {
    Bucket: process.env.BUCKET_NAME,
    Key: image_name, //must be unique: if users upload same name, it will override
    Body: formatedBuffer /*file?.buffer,*/,
    ContentType: file?.mimetype,
  };
  const command = new PutObjectCommand(s3Params);
  await s3Client.send(command);

  try {
    if (!desc) {
      res.status(400);
      throw new Error('Text required');
    }
    const newPost = await prisma.post.create({
      data: {
        desc,
        image_name,
        user: {
          connect: {
            id: req.session.userId,
          },
        },
      },
    });

    // after adding the post, need to make sure to update the redis cache as well since getPosts will be grabbing from there. Alternative would be to just invalidate the redis cache by deleting the key value pair:  await redis.del(`feed-${req.session.userId}`);
    const cachedPostsString = await redis.get(`feed-${req.session.userId}`);
    if (cachedPostsString) {
      const cachedPosts = JSON.parse(cachedPostsString);
      cachedPosts.unshift(newPost);

      await redis.set(
        `feed-${req.session.userId}`,
        JSON.stringify(cachedPosts),
        'EX',
        3600
      );
    }
    res.status(201).json(newPost);
  } catch (err) {
    return next(err);
  }
  // const time = moment(Date.now()).format('YYY-MM-DD HH:mm:ss'); // maybe format date in the front end
  // console.log(time);
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; //id will come back as string from req.params
  const userId = parseInt(id);
  try {
    const post = await prisma.post.findUnique({
      where: { id: userId },
    });

    if (!post) {
      res.status(404);
      throw new Error('post not found');
    }

    if (post.image_name) {
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: post.image_name,
      };

      const command = new DeleteObjectCommand(params);
      await s3Client.send(command);
    }

    await prisma.post.delete({ where: { id: userId } });
  } catch (error) {
    return next(error);
  }
};

export const getAllPosts = async (_: Request, res: Response) => {
  const allPosts = await prisma.post.findMany();
  res.status(200).json(allPosts);
};

export const deleteAllPosts = async (
  _: Request,
  __: Response,
  next: NextFunction
) => {
  await prisma.post.deleteMany();
  return next();
};
