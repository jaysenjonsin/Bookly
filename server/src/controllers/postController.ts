import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';
import { redis } from '..';

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //response time went from 379ms - 6ms
    // const cachedPosts = await redis.get(`feed-${req.session.userId}`);
    // if (cachedPosts) return res.status(200).json(JSON.parse(cachedPosts));

    const posts = await prisma.post.findMany({
      select: {
        id: true,
        desc: true,
        img: true,
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

    //redis.set(key(must be a string), value, EX (for expiration), expiration time in seconds)
    redis.set(`feed-${req.session.userId}`, JSON.stringify(posts), 'EX', 3600);
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
  // express server doesnt know how to deal with multipart form data by default, so will use multer middleware
  // const { desc, img } = req.body;
  const desc = req.body.desc;
  let img;
  try {
    if (!desc) {
      res.status(400);
      throw new Error('Text required');
    }
    const newPost = await prisma.post.create({
      data: {
        desc,
        img, //this will auto set to null if no img input
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
