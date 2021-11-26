// types
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { prisma } from "../../../lib/prisma";
import { verify, hashPassword } from "../../../lib/auth"
const { user } = prisma;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // ! check session
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ success: false, message: "Unauthenticated" });
    }
    const users = session.user as any;

    try {
        const { newPassword, oldPassword } = req.body
        const newHashedPassword = await hashPassword(newPassword)
        const result = await user.findFirst({
            where: {
                id: users.id
            },
        });

        if (result) {
            var passwordIsValid = await verify(
                oldPassword,
                result.password
            );
            if (!passwordIsValid) return res.status(404).json({
                success: false, message: "Wrong credential."
            });
            const newUser = await user.update({
                where: {
                    id: users.id
                },
                data: {
                    password: newHashedPassword
                }
            })
            return res.status(200).json({ success: true, newUser });
        }
        return res.status(404).json({ success: false, message: "User not found." });

    } catch (error) {
        console.log(error);

        return res
            .status(500)
            .send({ success: false, message: "Something went wrong.", error });
    }


};
