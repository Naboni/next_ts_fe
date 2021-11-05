// types
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { prisma } from "../../../lib/prisma";

import { Pv } from "../../../constants/roles";

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

  const user = session.user as any;
  const { tiktokHandle, pasteCode } = req.body;

  try {
    const checkClaim = await claim.findUnique({
      where: {
        userId: user?.id,
      },
    });

    if (checkClaim) {
      return res.status(400).json({
        success: false,
        message:
          "Your account is already under verification. Please wait patiently.",
      });
    }

    await prisma.$transaction([
      // ! 1. update user profile
      prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          profileVerification: Pv.PENDING as any,
        },
      }),
      // ! 2. Create verification
      claim.create({
        data: {
          pasteCode,
          tiktokHandle,
          userId: user?.id,
        },
      }),
    ]);

    return res.status(201).json({
      success: true,
      message:
        "You successfully started the verification process. This might take at most 48 hours.",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong.", error });
  }
};
