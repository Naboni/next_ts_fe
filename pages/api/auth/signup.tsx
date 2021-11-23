import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { hashPassword } from "../../../lib/auth";
import { Roles } from "../../../constants/roles";

const { user, referal } = prisma;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const { username, email, password, role, referrer } = req.body;

    // ! Validate username
    let username_not_taken = await checkDuplicateUsername(username);
    if (!username_not_taken) {
      return res.status(400).json({
        success: false,
        message: "Username already taken.",
      });
    }
    // ! Validate email
    let email_not_taken = await checkDuplicateEmail(email);
    if (!email_not_taken) {
      return res.status(400).json({
        success: false,
        message: "Email already taken.",
      });
    }

    if (role === Roles.ADMIN || role === Roles.DEV) {
      return res.status(400).json({
        success: false,
        message: "Bad Request.",
      });
    }

    const referralLink = referrer as string;

    const newUser = await user.create({
      data: {
        username,
        email,
        password: await hashPassword(password),
        role,
      },
    });

    if (referralLink !== "") {
      const referrerUser = await user.findUnique({
        where: {
          username: getUsernameFromReferralLink(referralLink),
        },
      });

      if (referrerUser) {
        const ref = await referal.create({
          data: {
            referedId: newUser.id,
            referrerId: referrerUser.id,
          },
        });
      }
    }

    res.status(201).json({
      message: "Registration successful.",
      success: true,
    });
  } catch (error) {
    res.status(400).send({ message: "Invalid inputs!", error });
  }
};

const checkDuplicateUsername = async (username: string) => {
  let res = await user.findUnique({
    where: {
      username,
    },
  });
  return res ? false : true;
};
const checkDuplicateEmail = async (email: string) => {
  let res = await user.findUnique({
    where: {
      email,
    },
  });
  return res ? false : true;
};

const getUsernameFromReferralLink = (referralLink: string) => {
  const removedFirstSalt = referralLink.substring(10);
  const username = reverseString(reverseString(removedFirstSalt).substring(10));
  return username;
};

const reverseString = (str: string) => {
  const strArray = str.split("");
  const reversedArray = strArray.reverse();
  const reversedString = reversedArray.join("");
  return reversedString;
};
