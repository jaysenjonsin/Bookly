-- prisma sql equivalents
--note: when defining foreign and primary key, make sure to put the key in ()  ex. FOREIGN KEY ("user_id")

-- create user table
-- note: by default, primary key is already indexed in postgres
CREATE TABLE "social"."users" ("id" serial NOT NULL,"username" varchar(45) NOT NULL UNIQUE,"email" varchar(45) NOT NULL UNIQUE,"password" varchar(500) NOT NULL,"name" varchar(50) NOT NULL,"cover_pic" varchar(200),"profile_pic" varchar(200),"city" varchar(50),"website" varchar(50),  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, PRIMARY KEY ("id"));

--type "serial" in postgres applies autoincrement

-- create posts table
CREATE TABLE "social"."posts" ("id" serial NOT NULL, "desc" varchar(200), "img" varchar(200), "user_id" INT, PRIMARY KEY ("id"), CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "social"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE);

-- create comments table
CREATE TABLE "social"."comments" ("id" serial NOT NULL, "desc" varchar(200) NOT NULL, "img" varchar(200), "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP(3) NOT NULL,  "user_id" INT NOT NULL, "post_id" INT NOT NULL, CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "social"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "post_id" FOREIGN KEY "post_id" REFERENCES "social"."posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE);

--create stories table
CREATE "social"."stories"("id" serial NOT NULL, "img" varchar(400) NOT NULL, "user_id" INT NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "social"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE);

--create relationships table - join table for "User" to "User" many to many relationship
CREATE TABLE "social"."relationships"("id" serial NOT NULL, "follower_user_id" INT NOT NULL, "followed_user_id" INT NOT NULL, PRIMARY KEY("id"), CONSTRAINT "follower_user" FOREIGN KEY("follower_user_id") REFERENCES "social"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "follwed_user" FOREIGN KEY("followed_user_id") REFERENCES "social"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE);