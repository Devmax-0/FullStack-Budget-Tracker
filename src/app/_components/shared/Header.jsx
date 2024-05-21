"use client";

import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  return (
    <div className="bg-[#F1F5F9] flex justify-between p-5 shadow-md">
      <Image src={"./logo.svg"} alt="logo" width={140} height={40} />

      {isSignedIn ? (
        <div className="flex justify-center items-center gap-5">
          <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
          <UserButton />
        </div>
      ) : (
        <Button variant="default" onClick={() => router.push("/sign-up")}>
          Get Started
        </Button>
      )}
    </div>
  );
};

export default Header;
