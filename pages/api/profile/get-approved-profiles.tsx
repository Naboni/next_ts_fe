// types
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/client";
import { Roles } from "@/constants/roles";

import { prisma } from "lib/prisma";

const { user } = prisma;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  // ! check session
  const session = await getSession({ req });
  const suser = session?.user;

  if (!session || (suser as any).role !== Roles.ADMIN) {
    return res.status(401).json({ success: false, message: "Unauthenticated" });
  }

  try {
    const result = await user.findMany({
      where: { role: "CREATOR", profileVerification: "APPROVED" },
    });
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong.", error });
  }
};
