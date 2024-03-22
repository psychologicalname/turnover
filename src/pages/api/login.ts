import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '~/server/db';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '~/utils/sessionOptions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    if (req.method === 'POST') {
        const { email, password } = req.body;
        try {
            const user = await db.user.findUnique({
                where: {
                    email,
                    password
                }
            })
            if (user) {
                session.isLoggedIn = true;
                session.email = user.email;
                await session.save();
                res.status(200).json({ isLoggedIn: true, email: user.email, name: user.name });
            }
            else {
                return res.json({ isLoggedIn: false });
            }
        } catch (error) {
            res.status(500).json({ isLoggedIn: false });
        }
    }
    else if (req.method === "GET") {

        if (session.isLoggedIn !== true) {
            return res.json({ isLoggedIn: false });
        }

        //Check if the user is in Database
        const user = await db.user.findUnique({
            where: {
                email: session.email,
            }
        })

        return res.json({...user, isLoggedIn: true});
    } else if (req.method === "DELETE") {
        session.destroy();

        return res.json({ isLoggedIn: false });
    }
    else {
        res.status(405).json({ message: 'We do not support this METHOD' });
    }
}