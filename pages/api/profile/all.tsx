// types
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/client";
import { Roles } from "@/constants/roles";

import { prisma } from "lib/prisma";

const { profile } = prisma;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  // ! check session
  const session = await getSession({ req });
  const user = session?.user as any;

  if (!session || (user.role !== Roles.ADMIN && user.role !== Roles.BRAND)) {
    return res.status(401).json({ success: false, message: "Unauthenticated" });
  }

  try {
    const result = await profile.findMany({
      select: {
        bio: true,
        followers: true,
        handle: true,
        name: true,
        trend: true,
        userId: true,
        view: true,
      },
    });
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong." });
  }
};
