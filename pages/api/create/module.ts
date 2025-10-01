import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // SAVE FILE
    const { main_name, sub_name, role, has_sub } = req.body

    console.log(main_name, sub_name, role, has_sub)

    res.status(200).json({
      success: true,
      response: 'Module create successfully!'
    })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}