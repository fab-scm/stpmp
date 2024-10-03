"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export const SignInButton = () => {
  return (
    <Button className="mr-10">
      <Link href="/sign-in">Sign In</Link>
    </Button>
  );
};

export const SignUpButton = () => {
  return (
    <Button className="mr-10">
      <Link href="/sign-up">Sign Up</Link>
    </Button>
  );
};

export const SignOutButton = () => {
  return (
    <Button className="mr-10" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

export const ProfileButton = () => {
  return (
    <Button className="mr-10">
      <Link href="/profile">Profile</Link>;
    </Button>
  );
};
