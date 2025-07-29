import express from 'express'
import { authenticateToken } from '../middleware/authMiddleware'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = express.Router()

router.post('/', authenticateToken, async (req: any, res) => {
  const { distance, time, paceMinutes, paceSeconds, notes } = req.body
  console.log(req.body)

  if (paceSeconds || paceMinutes > 59) {
    return res.status(400).json({ error: 'Seconds and/or minutes must be 59 seconds or less' })
  }
  try {
    const run = await prisma.run.create({
      data: {
        distance,
        time,
        paceMinutes,
        paceSeconds,
        notes,
        userId: req.userId
      }
    })
    res.status(201).json(run)
  } catch (error) {
    res.status(500).json({error: 'Failed to create new run!'})
    console.log(error)
  }
})

router.get('/', authenticateToken, async (req: any, res) => {
  try {
    const runs = await prisma.run.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    })
    res.status(200).json(runs)
  } catch (error) {
    res.status(500).json({ error: 'Error getting run data!' })
  }
})

export default router