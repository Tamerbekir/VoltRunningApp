//verify user via token 

import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
  userId?: number
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Denied. No token found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    req.userId = decoded.userId;
    next();
    console.log("User is logged in and generated token now in session!")
  } catch (error) {
    res.status(403).json({ error: 'Token Error' });
  }
};
