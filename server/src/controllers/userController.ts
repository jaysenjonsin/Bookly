import { Request, Response } from 'express';

const userController = {
  register: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    res.send({ username, password });
  },
};

export default userController;
