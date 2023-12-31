import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { Globe } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { userId } = auth();

  return (
    <section id="home" className="flex h-full max-md:flex-col-reverse ">
      {/* left section */}
      <div className="flex-col flex-1 p-5">
        <div className={`max-md:p-0 p-8`}>
          <h1 className="max-md:mt-0 mt-[100px] text-4xl font-extrabold text-primary dark:text-white">
            Unleash Your Creativity with
            <span className="text-gray-600"> Cloud Pulse</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Effortlessly share any type of file, collaborate seamlessly, and
            supercharge your workflow. Cloud Pulse is your modern solution for
            efficient file management and collaboration, designed to enhance
            your creative journey.
          </p>
          {userId && (
            <Button variant={"default"} className="mt-6">
              <a href="/dashboard">Go to dashboard</a>
            </Button>
          )}
        </div>
      </div>

      {/* right section */}
      <div className="flex-1">
        <div className="flex items-center justify-center h-full">
          <div className="mt-12 w-fit">
            <Image height={600} width={600} src={"/Cloud.svg"} alt="Cloud" />
          </div>
        </div>
      </div>
    </section>
  );
}
