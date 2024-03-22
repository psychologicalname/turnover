import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '~/server/db';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '~/utils/sessionOptions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    if (req.method === 'POST') {
        const { email, password, name } = req.body;
        try {
            const user = await db.user.create({
                data: {
                    email,
                    password,
                    name,
                },
            });
            session.isLoggedIn = true;
            session.email = user.email;
            await session.save();
            res.status(200).json({ isLoggedIn: true, email: user.email, name: user.name });
        } catch (error) {
            res.status(500).json({ message: 'Looks like this E-mail already exists!' });
        }
    }
    else {
        res.status(405).json({ message: 'We do not support this METHOD' });
    }
}