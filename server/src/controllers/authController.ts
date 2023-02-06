import { Request, Response } from 'express';
import { prisma } from '..';

const authController = {
  register: async (req: Request, res: Response) => {
    prisma.user.create({
      data:{
        
      }
    })
  },
};

export default authController;
