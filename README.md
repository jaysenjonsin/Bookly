## **Bookly**
  <p align="center">
    <img src="/client/public/undraw_Book_reading_re_fu2c.png" width="300">
</p>

  <p align = "center">
  <b>A social network platform for book enthusiasts.</b>
  </p>


## **Table of Contents**

- [Description](https://github.com/jaysenjonsin/Bookly#Description)
- [Key Features](https://github.com/jaysenjonsin/Bookly#Key-Features)
- [Built With](https://github.com/jaysenjonsin/Bookly#Built-With)
- [Installation](https://github.com/jaysenjonsin/Bookly#Installation)
- [How to Contribute](https://github.com/jaysenjonsin/Bookly#How-to-Contribute)

## **Description**

Bookly is a social network platform tailored exclusively for book enthusiasts. Bookly offers a haven for readers to connect, share their reading journeys, and discuss their favorite books.

## **Key Features**

- coming soon.

## **Built With:**

- Typescript
- React
- Next.js
- Express
- Node
- PostgreSQL
- Prisma
- Redis
- Amazon S3

## **Installation**

<b>Prerequisites: </b>
To create your own environment for the application, you will need these prerequisite services to fill out the environmental variables.

- <a href = 'https://www.postgresql.org/'> PostgreSQL </a>
- <a href = 'https://aws.amazon.com/s3/'> Amazon S3 </a>
- <a href = 'https://redis.io/'> redis </a>

1. Fork and clone the repository
```
git clone https://github.com/<your-username>/bookly.git
```

2. Install dependencies
```
cd bookly/client
npm i
cd ../server
npm i
```

3. Create a .env file in the root of the project and add the following environment variables:
```
NODE_ENV = development
PORT =
SESSION_SECRET =
DELETE_ALL_USERS_URL = '/123'
BUCKET_NAME =
BUCKET_REGION =
BUCKET_ACCESS_KEY =
BUCKET_SECRET_ACCESS_KEY = 
```
4. Create .env file in /server add add the DB environment variable:

   ```
   DATABASE_URL = 
   ```
5. Start up development servers
```
redis-server
```
From /server:
```
npm run server
```
From /client:
```
npm run dev
```

## **How to Contribute**

Any further contributions to this project would be greatly appreciated! Here’s how:

1. Fork and Clone the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Added an AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request
