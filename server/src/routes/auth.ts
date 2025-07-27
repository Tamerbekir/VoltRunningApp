import express from 'express'
import { registerUser, loginUser } from '../controllers/auth'
import { authenticateToken } from '../middleware/authMiddleware'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

//For testing route + server are working via GET
// router.get('/ping', (_req, res) => {
//   console.log("📡 ping route hit");
//   res.json({ message: "pong" });
// });


router.get('/me', authenticateToken, async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, createdAt: true }
    });

    if (!user) {
      return res.status(404).json({ error: "No user found!" });
    }

    res.json(user)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error!' });
  }
});
export default router