import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '~/server/db';
import { faker } from "@faker-js/faker";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const categories = Array.from({ length: 100 }, () => ({
            uuid: faker.string.uuid(),
            name: faker.commerce.department(),
        }));

        const create = await db.interest.createMany({
            data: categories,
        });

        console.log(create)

        return res.json({message: 'Interests created successfully!'});
    }
    else {
        res.status(405).json({ message: 'We do not support this METHOD' });
    }
}