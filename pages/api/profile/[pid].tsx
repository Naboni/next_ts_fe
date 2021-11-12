// types
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/client";

import { prisma } from "@/lib/prisma";
import { Roles } from "@/constants/roles";
import { Pv } from "@/constants/roles";

const { cache, profile } = prisma;

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

  const pid = req.query.pid as string;

  try {
    const cachedProfile = await cache.findFirst({
      where: { url: `/api/profile/${pid}` },
    });

    if (cachedProfile) {
      const currentDate = new Date();
      // ! subtract 16 hours
      currentDate.setHours(currentDate.getHours() - 16);
      if (!(cachedProfile.updatedAt < currentDate)) {
        return res
          .status(200)
          .json({ success: true, response: cachedProfile.response });
      }
    }

    const result = await profile.findUnique({
      where: {
        userId: pid,
      },
    });

    if (!result) {
      return res
        .status(200)
        .json({ success: true, response: "No profile" });
    }

    const urls = result?.sampleVideos;
    let requests = urls!.map((url) =>
      fetch(`https://www.tiktok.com/oembed?url=${url}`)
    );

    const resp = await Promise.all(requests).then((responses) =>
      Promise.all(responses.map((r) => r.json()))
    );

    const response = { ...result, sampleVideos: resp };
    // ! create or update cache
    await cache.upsert({
      where: {
        url: `/api/profile/${pid}`,
      },
      update: {
        response,
      },
      create: { url: `/api/profile/${pid}`, response },
    });

    return res.status(200).json({ success: true, response });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong.", error });
  }
};
