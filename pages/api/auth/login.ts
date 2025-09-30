import type { NextApiRequest, NextApiResponse } from 'next'
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/ironSession";
import { AUTH } from '@/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { username, password } = req.body
    if (!AUTH[username as keyof typeof AUTH] && password !== "DRR@dm1n") {
      res.status(400).json({
        success: false,
        response: 'ไม่มีบัญชีผู้ใช้อยู่ในระบบ'
      })
    }
    // GET SESSION
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    // SET SESSION
    session.username = username;
    session.role = AUTH[username as keyof typeof AUTH].role;
    session.access_token = AUTH[username as keyof typeof AUTH].access_token
    session.isLoggedIn = true;
    // SAVE SESSION
    await session.save();
    // RETURN
    res.status(200).json({
      success: true,
      response: session
    })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}