//@ts-ignore
import express from 'express'; //<-- need this line for there not to be an error in index.ts, not sure why

declare module 'express-session' {
  interface SessionData {
    userId: number; //add userId to session object so we can set req.session.userId to the user's id
  }
}
