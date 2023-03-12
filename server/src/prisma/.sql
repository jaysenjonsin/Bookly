-- prisma sql equivalents
--note: when defining foreign and primary key, make sure to put the key in ()  ex. FOREIGN KEY ("user_id"). also use () when defining references ex. "social"."users"("id")

-- create user table
-- note: by default, primary key is already indexed in postgres
CREATE TABLE "social"."users" ("id" serial NOT NULL,"username" varchar(45) NOT NULL UNIQUE,"email" varchar(45) NOT NULL UNIQUE,"password" varchar(500) NOT NULL,"name" varchar(50) NOT NULL,"cover_pic" varchar(200),"profile_pic" varchar(200),"city" varchar(50),"website" varchar(50),  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, PRIMARY KEY ("id"));

--type "serial" in postgres applies autoincrement

--note: If names do not contain any special characters, you dont have to put quotes around them. prisma just did it by default. So, creating a table could actually just look like this: 
CREATE TABLE social.users (
    id serial NOT NULL,
    username varchar(45) NOT NULL UNIQUE,
    email varchar(45) NOT NULL UNIQUE,
    password varchar(500) NOT NULL,
    name varchar(50) NOT NULL,
    cover_pic varchar(200),
    profile_pic varchar(200),
    city varchar(50),
    website varchar(50),
    createdAt TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP(3) NOT NULL,
    PRIMARY KEY (id)
);

-- create posts table
CREATE TABLE "social"."posts" ("id" serial NOT NULL, "desc" varchar(200), "img" varchar(200), "user_id" INT, PRIMARY KEY ("id"), CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "social"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE);

-- create comments table
CREATE TABLE "social"."comments" ("id" serial NOT NULL, "desc" varchar(200) NOT NULL, "img" varchar(200), "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP(3) NOT NULL,  "user_id" INT NOT NULL, "post_id" INT NOT NULL, CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "social"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "post_id" FOREIGN KEY "post_id" REFERENCES "social"."posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE);

--create stories table
CREATE "social"."stories"("id" serial NOT NULL, "img" varchar(400) NOT NULL, "user_id" INT NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "social"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE);

--create relationships table - join table for "User" to "User" many to many relationship
CREATE TABLE "social"."relationships"("id" serial NOT NULL, "follower_user_id" INT NOT NULL, "followed_user_id" INT NOT NULL, PRIMARY KEY("id"), CONSTRAINT "follower_user" FOREIGN KEY("follower_user_id") REFERENCES "social"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "follwed_user" FOREIGN KEY("followed_user_id") REFERENCES "social"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE);

--note: here is the sql generated if using combo of follower and followed id to generate primary key:
CONSTRAINT "relationships_pkey" PRIMARY KEY ("follower_user_id","followed_user_id")

--create likes table
CREATE TABLE "social"."likes"("id" serial NOT NULL, "user_id" INT NOT NULL, "post_id" NOT NULL, PRIMARY KEY("id"), CONSTRAINT "user_id" FOREIGN KEY("user_id") REFERENCES "social"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "post_id" FOREIGN KEY("post_id") REFERENCES "social"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE);

--example of adding foreign key after table is already created:
ALTER TABLE "social"."posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "social"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;


--REGISTER USER
  --check if user exists based on username
  SELECT FROM users WHERE username = $1 --then check if exists, return errors, etc

  --more specific: check if user exists based on username or email
   SELECT "social"."users"."id", "social"."users"."username", "social"."users"."email", "social"."users"."password", "social"."users"."name", "social"."users"."cover_pic", "social"."users"."profile_pic", "social"."users"."city", "social"."users"."website", "social"."users"."created_at", "social"."users"."updated_at" FROM "social"."users" WHERE ("social"."users"."email" = $1 OR "social"."users"."username" = $2) LIMIT $3 OFFSET $4 -- then check if exists, return errors, etc
  
  const query = 'INSERT INTO users('username', 'email', 'password', 'name') VALUES ($1,$2,$3,$4) RETURNING *'

  const values = [username, email, hashedpassword, name] --get from req.body
  const result = await pool.query(query,values);
  return result.rows[0];


  --CREATE USER
BEGIN -- <-- start of a transaction, indicating sereis of related database operations to be executed
INSERT INTO "social"."users" ("username","email","password","name","created_at","updated_at") VALUES ($1,$2,$3,$4,$5,$6) RETURNING "social"."users"."id"
SELECT "social"."users"."id", "social"."users"."username", "social"."users"."email", "social"."users"."password", "social"."users"."name", "social"."users"."cover_pic", "social"."users"."profile_pic", "social"."users"."city", "social"."users"."website", "social"."users"."created_at", "social"."users"."updated_at" FROM "social"."users" WHERE "social"."users"."id" = $1 LIMIT $2 OFFSET $3
COMMIT -- <-- end of transaction

--LIMIT: restricts # of rows returned by a query
--OFFESET: skip a specified number of rows in the result set

--LOGIN USER
--select everything but password
const query = `
    SELECT id, username, email, password, name, cover_pic, profile_pic, city, website, created_at, updated_at
    FROM "users"
    WHERE email = $1 OR username = $2
    LIMIT 1
  `;
  const values = [usernameOrEmail, usernameOrEmail];
  const result = await pool.query(query, values);

--if user not found, return error
if (result.rowCount === 0)  return { error: 'User not found' };

--if user found, check their encrypted password
const data = result.rows[0];
const checkPassword = await bcrypt.compare(req.body.password, data.password);
}
--if checkPassword true, return success, else return error


--GET ALL POSTS ONLY FROM USER WHO CREATED IT
--note: we have to say u.id as userId because if we didnt, there would be conflict. there is id on both posts and users, so if we select from both they would both be called id. so we can give u.id an alias.
--grab everything from posts and id, name and profile picture from users where the users id equals the foreign key (user_id) in posts
SELECT p.*, u.id as userId, name, profile_pic FROM posts AS p JOIN users as u ON (u.id = p.user_id)

--SIMPLE JOIN TABLE FORMAT: select <anything from first table>, <anything from second table> FROM <first table> AS <alias> JOIN <second table> as <alias> ON (<table id = other table's foreign key referencing table id>)


--GET POSTS FROM ONLY WHO YOU FOLLOW
SELECT p.*, u.id as userId, name, profile_pic FROM posts as p JOIN users as u ON (u.id = p.user_id) JOIN relationships as r ON (p.user_id = r.followed_user_id AND r.follower_user_id = <current user id>)

--NOTE: we would get <current user id> from the cookies, or from howevever else we determine who is currently logged in. ex. <current user id> = req.cookies.ski

--if we wanted to get posts from both who you follow AND yourself, you would use a left join: 
SELECT p.*, u.id as userId, name, profile_pic 
FROM posts as p 
JOIN users as u ON (u.id = p.user_id) 
LEFT JOIN relationships as r ON (p.user_id = r.followed_user_id AND r.follower_user_id = <current user id>)
WHERE p.user_id = <current user id> OR r.follower_user_id = <current user id>

--can order latest to earliest by using descending order:

... ORDER BY p.createdAt DESC

--This is what a function would look like using pg library:
-- export const getPosts = (req, res) => {
--     const q =
--       userId !== "undefined"
--         ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
--         : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
--     LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
--     ORDER BY p.createdAt DESC`;

--     const values =
--       userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

--     db.query(q, values, (err, data) => {
--       if (err) return res.status(500).json(err);
--       return res.status(200).json(data);
--     });
--   });
-- };


--ADD POST
export const addPost = (req, res) => {
    const q =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), --we dont actually have to add or get createdAt because we set default value in our schema
      userInfo.id, <-- could be a req.params, or in our case req.session.userId
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};