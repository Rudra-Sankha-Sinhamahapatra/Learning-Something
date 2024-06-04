"use client"
import Image from 'next/image';
import ChatgptImage from './images/image.png';
import { signIn, signOut, useSession } from 'next-auth/react';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  user?: {
    username?: string | null;
  };
}

export default function Home({ user }: Props) {
  const { data: session } = useSession(); 
  const router=useRouter();

  const handleAuthClick: MouseEventHandler<HTMLDivElement> = async () => {
    if (session) {
      await signOut(); 
      router.push("/api/auth/signin")

    } else {
      await signIn(); 
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-600">
        <div className="bg-purple-300 p-0 m-0">
          <div className="flex justify-center pt-10 pb-7 gap-8 min-w-full">
            <div className="text-white font-semibold cursor-pointer">My Purchases</div>
            <div className="text-white font-semibold cursor-pointer">Chat</div>
            <div className="text-white font-semibold cursor-pointer">Store</div>
            <div className="text-white font-semibold cursor-pointer">Contact Us</div>
            <div onClick={handleAuthClick} className="text-white font-semibold hover:underline hover:text-green-600 cursor-pointer">
              {session ? 'Logout' : 'Login'}
            </div>
          </div>
        </div>

        <div className="items-center flex justify-center">
          <div className="flex gap-8 justify-center bg-green-400 pt-10 w-full max-w-2xl h-auto py-20 px-10 mt-10 mb-20 ml-10">
            <div className="text-white font-semibold mt-5">
              Introducing Chatgpt Our AI <span className="rainbow-text font-bold">Chatbot</span>
            </div>
            <div>
              <Image width={400} height={400} src={ChatgptImage} alt="Chatgpt" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
