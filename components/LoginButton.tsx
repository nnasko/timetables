"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./Button";

const LoginButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={() => signOut()} className="flex gap-4 ml-auto text-white lg:text-md text-sm bg-red-600 rounded lg:px-4 lg:py-2 px-2 py-1">
          Logout
        </button>
      </div>
    );
  }
  return (
    <Link href={"/login"} className="flex gap-4 ml-auto text-white lg:text-md text-sm bg-violet-400 rounded lg:px-4 lg:py-2 px-2 py-1">
       Login
    </Link>
  );
};

export default LoginButton;