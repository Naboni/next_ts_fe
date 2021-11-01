import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { hashPassword } from "../../../lib/auth";

const { user } = prisma;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const { username, email, password, role } = req.body;

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
    user
      .create({
        data: {
          username,
          email,
          password: await hashPassword(password),
          role,
        },
      })
      .then((user) => {
        return res.status(201).json({
          message: "Registration successful.",
          success: true,
          user,
        });
      });
  } catch (error) {
    console.log(error);

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
