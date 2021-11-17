// types
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/client";
import { prisma } from "@/lib/prisma";

import { Roles } from "@/constants/roles";

const { campaign, user } = prisma;

import { mailer } from "@/lib/mailer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  // ! check session
  const session = await getSession({ req });
  const auser = session?.user as any;
  if (!session || auser.role !== Roles.BRAND) {
    return res.status(401).json({ success: false, message: "Unauthenticated" });
  }

  try {
    var date = new Date();
    const now = date.toISOString();
    console.log(now);
    
    const { creatorId, campaignIds } = req.body;

    const creator = await user.findUnique({ where: { id: creatorId } });
    if (!creator) {
      return res
        .status(404)
        .json({ success: false, message: "Creator not found!" });
    }
    if (campaignIds.length <= 0) {
      return res.status(400).json({ success: false, message: "Bad request!" });
    }

    let batchUpdates = [];
    let campaignNamesForInvitation = [];
    for (const id of campaignIds) {
      const currentCampaign = await campaign.findUnique({
        where: {
          id,
        },
      });
      if (!currentCampaign) {
        return res
          .status(404)
          .json({ success: false, message: "Campaign not found!" });
      }

      if (!currentCampaign?.pendingInvitations.includes(creatorId)) {
        // ! save company name for invitation email and for user.update
        campaignNamesForInvitation.push({
          companyName: currentCampaign.brandName,
          campaignId: currentCampaign.id,
        });
        batchUpdates.push(
          campaign.update({
            where: {
              id,
            },
            data: {
              pendingInvitations: [
                ...currentCampaign.pendingInvitations,
                creatorId,
              ],
            },
          })
        );
      }
    }

    let campaignIdWithDetails: any[] = [];
    if (campaignNamesForInvitation.length > 0) {
      campaignIdWithDetails = campaignNamesForInvitation.map((el: any) => {
        return {
          companyName: el.companyName,
          campaignId: el.campaignId,
          createdAt: now,
        };
      });
    }

    // ! only write if batchUpdate list is > 0. b/c if empty, the company already invited that person
    if (batchUpdates.length > 0) {
      await prisma.$transaction([
        // ! 1. update campaign
        ...batchUpdates,
        // ! 2. update user
        user.update({
          where: {
            id: creatorId,
          },
          data: {
            pendingInvitations: [
              ...creator.pendingInvitations,
              ...campaignIdWithDetails,
            ],
          },
        }),
      ]);

      // !!!!!
      // ! the structure of the list changed. so, check before uncomment-ing
      // !!!!!
      //   const pendingMails = campaignNamesForInvitation.map((campaignName) =>
      //     mailer(`${campaignName} invited you to collaborate.`, "Invitation")
      //   );
      //   const r = await Promise.all(pendingMails);
      //   console.log(r);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: "Invalid inputs!", error });
  }
};
