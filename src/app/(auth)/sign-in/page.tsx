import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import UserSignInForm from "@/components/user-sign-in-form";

import { EarthIcon, LineChartIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          {/* <div className="absolute inset-0 bg-zinc-900" /> */}
          <Image
            src="/satellite-imagery-1.jpg"
            alt="Satellite image"
            className="absolute inset-0 object-cover w-full h-full"
            // fill={true}
            width={7292}
            height={7292}
          />
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              {/* <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer> */}
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <Link href="/" className="flex items-center space-x-2 absolute right-4 top-4 md:right-8 md:top-8">
            <EarthIcon size={32} strokeWidth={1} />
            <LineChartIcon size={32} strokeWidth={1} />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px] bg-background p-5 rounded-3xl border-1 shadow-2xl">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
            </div>
            <UserSignInForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              You don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up here
              </Link>{" "}
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
