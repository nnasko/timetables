"use client";
import React, { useRef, useState } from "react";
import InputBox from "./InputBox";
import { Button } from "./Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const Login = (props: Props) => {
  const [error, setError] = useState<string | null>(null);
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

    console.log(res);
    
    if (res?.error === 'CredentialsSignin') {
      setError("Authentication failed");
    } else {
      router.push(props.callbackUrl ?? "https://timetables-beta.vercel.app/");
    }
  };
  return (
    <div className={props.className}>
      <div className="min-h-screen flex bg-[#181818] items-center justify-center">
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
              {!!error && (
                <p className="text-red-400 border-b rounded text-center p-2">
                  {error}
                </p>
              )}
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