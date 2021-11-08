// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
// ! this route only returns the hashed tiktok handle
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

// types
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/client";
import { hashPassword } from "../../../lib/auth";

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

  const user = session.user;
  const tiktokHandle = req.body.tiktokHandle;
  const pasteCode = await hashPassword(tiktokHandle);

  try {
    return res.status(200).json({ success: true, tiktokHandle, pasteCode });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Something went wrong.", error });
  }
};
