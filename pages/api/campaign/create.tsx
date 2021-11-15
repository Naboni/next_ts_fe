// types
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { prisma } from "../../../lib/prisma";

const { campaign } = prisma;

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

  try {
    const {
      brandIndustry,
      brandName,
      brandWebsite,
      campaignDuration,
      campaignGoal,
      campaignName,
      campaignPrice,
      campaignPriceType,
      contactName,
      email,
      message,
      negotiationType,
      otherSocialMedia,
      phone,
      productName,
    } = req.body;

    const createdCampaign = await campaign.create({
      data: {
        brandIndustry,
        brandName,
        brandWebsite,
        campaignDuration,
        campaignGoal,
        campaignName,
        campaignPrice,
        campaignPriceType,
        contactName,
        email,
        message,
        negotiationType,
        otherSocialMedia,
        phone,
        productName,
        acceptedInvitations: [],
        pendingInvitations: [],
        rejectedInvitations: [],
        videos: [],
        userId: user.id,
      },
    });

    return res.status(201).json(createdCampaign);
  } catch (error) {
    res.status(400).send({ success: false, message: "Invalid inputs!", error });
  }
};
