"use client";

import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  return (
    <div>
      <section className=" bg=[#F1F5F9]">
        <div className="mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold text-[#283841] sm:text-5xl">
              Track Every Penny
              <strong className="font-extrabold text-[#283841] sm:block">
                Master Your Finances!
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Our budget tracking app empowers you to take control of your
              finances effortlessly. Our app lets you monitor every penny you
              spend and save.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button onClick={() => router.push("/signup")}>
                Get Started
              </Button>
              <Button variant="ghost">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
