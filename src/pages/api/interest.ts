import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { getIronSession } from 'iron-session';

import { SessionData, sessionOptions } from '~/utils/sessionOptions';
import { UserInterest } from '~/utils/types';

interface Interest {
    uuid: string;
    name: string;
    selected?: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    if (req.method === 'POST') {
        const { uuid } = req.body as { uuid: string };
        try {
            const isLoggedIn: boolean | undefined = session.isLoggedIn;
            if (isLoggedIn) {
                const user = await db.user.findUnique({
                    where: {
                        email: session.email,
                    },
                    select: {
                        interests: {
                            select: {
                                uuid: true,
                            },
                        },
                    },
                });
                if (user) {
                    if (user.interests?.some(interest => interest.uuid === uuid)) {
                        await db.user.update({
                            where: {
                                email: session.email,
                            },
                            data: {
                                interests: {
                                    disconnect: {
                                        uuid,
                                    },
                                },
                            },
                        });
                    } else {
                        await db.user.update({
                            where: {
                                email: session.email,
                            },
                            data: {
                                interests: {
                                    connect: {
                                        uuid,
                                    },
                                },
                            },
                        });
                    }
                    return res.status(200).json({ message: 'Updated!' });
                } else {
                    return res.status(200).json({ message: 'Session Expired!' });
                }
            } else {
                return res.json({ isLoggedIn: false });
            }
        } catch (error) {
            res.status(500).json({ isLoggedIn: false });
        }
    } else if (req.method === 'GET') {
        let myInterests: UserInterest[] = [];
        const isLoggedIn: boolean | undefined = session.isLoggedIn;
        if (isLoggedIn) {
            const user = await db.user.findUnique({
                where: {
                    email: session.email,
                },
                select: {
                    interests: {
                        select: {
                            uuid: true,
                        },
                    },
                },
            });
            if (user) {
                myInterests = user.interests || [];
            }
        }

        const interests: Interest[] = await db.interest.findMany({
            select: {
                uuid: true,
                name: true,
            },
        });

        interests.forEach(interest => {
            interest.selected = myInterests.some(myInterest => myInterest.uuid === interest.uuid);
        });

        return res.json({ interests });
    } else {
        res.status(405).json({ message: 'We do not support this METHOD' });
    }
}
