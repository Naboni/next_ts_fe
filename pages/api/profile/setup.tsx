// types
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { prisma } from "../../../lib/prisma";

import { Pv, Roles } from "../../../constants/roles";

const { profile } = prisma;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  // ! check session
  const session = await getSession({ req });
  const user = session?.user as any;
  if (!session || user.role !== Roles.ADMIN) {
    return res.status(401).json({ success: false, message: "Unauthenticated" });
  }

  try {
    const {
      userId,
      name,
      tiktokHandle,
      profilePicture,
      followers,
      trend,
      bio,
      videoData,
      sampleVideos,
      sponsoredVideos,
    } = req.body;

    if (!videoData || !sponsoredVideos || !sampleVideos) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid inputs." });
    }
    const averageVideoData = calculateAverage(videoData);

    await prisma.$transaction([
      // ! 1. update user profile
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          profileVerification: Pv.COMPLETED as any,
        },
      }),
      // ! 2. Create verification
      profile.create({
        data: {
          name,
          handle: tiktokHandle,
          profilePicture,
          followers: followers,
          trend,
          bio,

          view: averageVideoData.views + "",
          like: averageVideoData.likes + "",
          share: averageVideoData.shares + "",
          comment: averageVideoData.comments + "",
          engagementRate: calculateEngagementRate(averageVideoData),

          sampleVideos: sampleVideos.map((e: any) => e.link),
          sponsoredVideos: sponsoredVideos.map((e: any) => e.link),

          experience: "BEGINNER" as any,
          userId,
        },
      }),
    ]);

    return res.status(201).json({
      success: true,
      message: "Successfully finished setting up profile.",
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send({ success: false, message: "Something went wrong.", error });
  }
};

interface video {
  views: string;
  likes: string;
  shares: string;
  comments: string;
}
const calculateAverage = (videoData: video[]) => {
  let total = { views: 0, likes: 0, shares: 0, comments: 0 };
  for (const video of videoData) {
    total.likes += parseInt(video.likes);
    total.views += parseInt(video.views);
    total.shares += parseInt(video.shares);
    total.comments += parseInt(video.comments);
  }
  return Object.assign({
    views: divideAndFloor(total.views),
    likes: divideAndFloor(total.likes),
    shares: divideAndFloor(total.shares),
    comments: divideAndFloor(total.comments),
  });
};

const divideAndFloor = (x: number) => Math.floor(x / 5);
const calculateEngagementRate = (videoData: any) => {
  return (
    (videoData.likes + videoData.comments + videoData.shares) /
    videoData.views
  ).toFixed(2);
};
