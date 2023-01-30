-- prisma sql equivalents

-- create user table
-- note: by default, primary key is already indexed in postgres
CREATE TABLE "social"."users" ("id" serial NOT NULL,"username" varchar(45) NOT NULL UNIQUE,"email" varchar(45) NOT NULL UNIQUE,"password" varchar(500) NOT NULL,"name" varchar(50) NOT NULL,"cover_pic" varchar(200),"profile_pic" varchar(200),"city" varchar(50),"website" varchar(50),  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL, PRIMARY KEY ("id"));



-- create posts table
CREATE TABLE "social"."posts" ("id" serial NOT NULL, "desc" varchar(200), "img" varchar(200), "user_id" INT, PRIMARY KEY ("id"), CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "social"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE);