// types
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { prisma } from "../../../lib/prisma";

const { claim } = prisma;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  // ! check session
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, message: "Unauthenticated" });
  }

  const user = session.user;
  const { tiktokHandle, pasteCode } = req.body;

  try {
    // const checkClaim = await claim.findUnique({ where: {} });
    const result = await claim.create({
      data: {
        pasteCode,
        tiktokHandle,
        userId: user.id,
      },
    });

    return res.status(201).json({ success: true, result });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong.", error });
  }
};
