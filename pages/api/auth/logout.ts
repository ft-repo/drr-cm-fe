import type { NextApiRequest, NextApiResponse } from 'next'
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/ironSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  session.destroy();

  return res.writeHead(302, { Location: '/auth/login' }).end()
}