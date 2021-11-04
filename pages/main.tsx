import React, { useEffect } from "react";

import { GetServerSideProps } from "next";
import { Session } from "next-auth";

import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

// components
import CenterLoading from "../components/CenterLoading";

interface User {
  id: null;
  username: string;
  email: string;
  password: null;
  createdAt: string;
  updatedAt: string;
  role: string;
}
export default function main({ session }: { session: Session }) {
  const user = session.user as User;
  const router = useRouter();

  useEffect(() => {
    // ! handle this case seriously !!!!!!!!!!!!!!!!!!!!!!!!!
    if (user.role === "VISITOR") {
      router.replace("/404");
    } else if (user.role === "BRAND") {
      router.replace("/my-activity/dashboard");
    } else if (user.role === "CREATOR") {
      router.replace("/activity/dashboard");
    } else if (user.role === "ADMIN") {
    } else if (user.role === "DEV") {
    } else router.replace("/404");
  }, []);

  return <CenterLoading height="100vh" width="100vw" bg="white" />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
