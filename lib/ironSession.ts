import { SessionOptions } from "iron-session";

export interface SessionData {
  username: string;
  role: string;
  access_token: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  username: "",
  role: "",
  access_token: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.TOKEN_SECRET || 'a7b9c3d2e8f1g4h6i9j2k5l7m0n3p6q8',
  cookieName: "DRR_CM",
  cookieOptions: {
    secure: false,
  },
};