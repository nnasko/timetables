"use client";
import React, { useRef } from "react";
import InputBox from "./InputBox";
import { Button } from "./Button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const Login = (props: Props) => {
  const router = useRouter();
  const userName = useRef("");
  const pass = useRef("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: false,
    });

    if (!res?.error) {
      router.push(props.callbackUrl ?? "https://timetables-beta.vercel.app/");
    }
  };
  return (
    <div className={props.className}>
      <div className="min-h-screen flex bg-[#181818] items-center justify-center">
      {!!props.error && (
        <p className="bg-red-100 text-red-600 text-center p-2">
          Authentication Failed
        </p>
      )}
      <form onSubmit={onSubmit} className="p-2 flex  bg-[#181818] rounded-lg border border-violet-400 flex-col gap-3">
        <InputBox
          name="username"
          labelText="Username"
          onChange={(e) => (userName.current = e.target.value)}
        />
        <InputBox
          name="password"
          type="password"
          labelText="Password"
          onChange={(e) => (pass.current = e.target.value)}
        />
        <div className="flex items-center justify-center mt-2 gap-2">
          <Button type="submit" className="w-28">
            Submit
          </Button>
        </div>
      </form>
     </div>
    </div>
  );
};

export default Login;