// types
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/client";
import { Roles } from "../../../constants/roles";

import { prisma } from "../../../lib/prisma";
import { Pv } from "../../../constants/roles";

const { user, claim } = prisma;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  // ! check session
  const session = await getSession({ req });
  const suser = session?.user as any;

  if (!session || (suser as any).role !== Roles.ADMIN) {
    return res.status(401).json({ success: false, message: "Unauthenticated" });
  }

  const { cid, uid } = req.body;

  try {
    await prisma.$transaction([
      // ! 1. update user profile
      user.update({
        where: {
          id: uid,
        },
        data: {
          profileVerification: Pv.REJECTED as any,
        },
      }),
      // ! 2. Create verification
      claim.delete({
        where: { id: cid },
      }),
    ]);

    return res
      .status(204)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send({ success: false, message: "Something went wrong.", error });
  }
};
