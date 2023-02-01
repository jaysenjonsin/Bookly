-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "social";

-- CreateTable
CREATE TABLE "social"."User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "password" VARCHAR(400) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "cover_pic" VARCHAR(200),
    "profile_pic" VARCHAR(200),
    "city" VARCHAR(50),
    "website" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social"."Post" (
    "id" SERIAL NOT NULL,
    "desc" VARCHAR(400) NOT NULL,
    "img" VARCHAR(400),
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social"."Comment" (
    "id" SERIAL NOT NULL,
    "desc" VARCHAR(400) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social"."Story" (
    "id" SERIAL NOT NULL,
    "img" VARCHAR(400) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social"."Relationship" (
    "id" SERIAL NOT NULL,
    "follower_user_id" INTEGER NOT NULL,
    "followed_user_id" INTEGER NOT NULL,

    CONSTRAINT "Relationship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "social"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "social"."User"("email");

-- AddForeignKey
ALTER TABLE "social"."Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "social"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social"."Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "social"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social"."Comment" ADD CONSTRAINT "Comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "social"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social"."Story" ADD CONSTRAINT "Story_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "social"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social"."Relationship" ADD CONSTRAINT "Relationship_follower_user_id_fkey" FOREIGN KEY ("follower_user_id") REFERENCES "social"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social"."Relationship" ADD CONSTRAINT "Relationship_followed_user_id_fkey" FOREIGN KEY ("followed_user_id") REFERENCES "social"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
