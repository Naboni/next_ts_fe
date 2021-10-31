import React, { useEffect } from "react";
import { useRouter } from "next/router";

// relative
import { currentUser } from "../backend-utils/user-utils";

// components
import CenterLoading from "../components/CenterLoading";

export default function main() {
  const router = useRouter();
  useEffect(() => {
    currentUser()
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);

          router.replace("/selectRole");
        } else {
          router.replace("/auth/signin");
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return <CenterLoading height="100vh" width="100vw" bg="white" />;
}
