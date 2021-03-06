// types
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/client";
import { Roles } from "../../../constants/roles";

import { prisma } from "../../../lib/prisma";

const { claim } = prisma;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  // ! check session
  const session = await getSession({ req });
  const user = session?.user;

  if (!session || (user as any).role !== Roles.ADMIN) {
    return res.status(401).json({ success: false, message: "Unauthenticated" });
  }

  try {
    const result = await claim.findMany({
      where: { user: { profileVerification: "PENDING" as any} },
      include: { user: true },
    });
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send({ success: false, message: "Something went wrong.", error });
  }
};
