// types
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { prisma } from "../../../lib/prisma";

const { campaign } = prisma;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
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

  try {
    const result = await campaign.findMany({
      where: {
        userId: user.id,
      },
    });

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send({ success: false, message: "Something went wrong.", error });
  }
};
