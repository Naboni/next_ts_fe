// types
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/client";

import { Roles } from "@/constants/roles";
import { Pv } from "@/constants/roles";
import { prisma } from "@/lib/prisma";

const { user } = prisma;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
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

  const cid = req.query.cid as string;

  try {
    await user.update({
      where: {
        id: cid,
      },
      data: {
        profileVerification: Pv.APPROVED as any,
      },
    });

    return res
      .status(204)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong.", error });
  }
};
