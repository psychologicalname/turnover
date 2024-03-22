import { SessionOptions } from "iron-session";

export interface SessionData {
  email: string;
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: "weqw_a_complex_password_jdkshdsaqg%$#djas*",
  cookieName: "user",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};