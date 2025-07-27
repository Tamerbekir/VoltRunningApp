// controllers/auth.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    res.status(201).json({ message: 'User created', user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log("Logged in");

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials. Try again' });

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log(password);
    // console.log(user.password);
    // console.log(isMatch);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials. Try again.' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.json({ token, user: { id: user.id, email: user.email } });
    console.log("Users generated token: ", token);

  } catch (err) {
    console.log("NO TOKEN");

    res.status(500).json({ error: 'Something went wrong' });
  }
};

