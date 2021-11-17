// types
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/client";

import { prisma } from "@/lib/prisma";

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

  const iid = req.query.iid as string;

  try {
    const invitedBy = await campaign.findUnique({
      where: {
        id: iid,
      },
      select: {
        brandIndustry: true,
        brandName: true,
        brandWebsite: true,
        productName: true,
        campaignDuration: true,
        campaignGoal: true,
        campaignName: true,
        campaignPrice: true,
        campaignPriceType: true,
        negotiationType: true,
        message: true,
        contactName: true,
        email: true,
        phone: true,
        otherSocialMedia: true,
        createdAt: true,
      },
    });

    if (!invitedBy) return res.status(404).json({ success: false });
    return res.status(200).json({ success: true, response: invitedBy });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong." });
  }
};
