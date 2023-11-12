// LoginButton.tsx
"use client"
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

const LoginButton = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [open, setOpen ] = useState(false);

  const handleOpen = async () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (session) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [session]);

  const handleLogin = async () => {
    setLoading(true);

    try {
      await signIn('your-auth-provider', { callbackUrl: '/' });
    } catch (error) {
      console.error('Login failed', error);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    

    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Logout failed', error);
    }

    setLoading(false);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-row gap-4 ml-auto relative z-10">
    {isAuthenticated && (
      <button onClick={handleOpen} className="text-transparent text-lg mt-2 bg-clip-text bg-gradient-to-r from-violet-200 to-violet-600">
        {session?.user?.name || 'Guest'}
        {open && (
          <div className='absolute top-10 right-0 border-2 border-violet-400 rounded p-2 justify-center bg-[#181818]'>
            <Link href='/settings'>
              <button className="flex gap-4 text-white lg:text-md mt-2 text-sm bg-emerald-500 hover:bg-emerald-600 rounded lg:px-4 lg:py-2 px-2 py-1">
                Settings
              </button>
            </Link>
            <button onClick={handleLogout} className='flex gap-4 text-white lg:text-md mt-2 text-sm bg-red-600 hover:bg-red-700 rounded lg:px-4 lg:py-2 px-2 py-1'>
              Logout
            </button>
          </div>
        )}
      </button>
    )}
    {isAuthenticated ? (
      <></>
    ) : (
      <button
        onClick={handleLogin}
        className="flex gap-4 ml-auto text-white lg:text-md text-sm bg-violet-400 rounded lg:px-4 lg:py-2 px-2 py-1"
      >
        Login
      </button>
    )}
  </div>
);
};

export default LoginButton;





