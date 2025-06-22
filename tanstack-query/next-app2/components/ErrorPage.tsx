import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { FlagIcon } from "@heroicons/react/24/solid";

export function ErrorSection() {
  return (
      <div className="h-screen mx-auto grid place-items-center text-center px-8">
        <div>
          <FlagIcon className="w-20 h-20 mx-auto" />
          <Typography
            variant="h1"
            className="mt-10 !text-3xl !leading-snug md:!text-4xl text-blue-gray-900"
            {...({} as any)}
          >
           <div>
           Error 404 <br /> It looks like something went wrong.
            </div> 
          </Typography>
          <Typography 
            variant="paragraph"
            className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm"
            {...({} as any)}
          >
            Don&apos;t worry, our team is already on it. Please try refreshing
            the page or come back later.
          </Typography>
          <Button 
            className="w-full px-4 md:w-[8rem] bg-gray-500"
            {...({} as any)}
          >
            back home
          </Button>
        </div>
      </div>
  );
}

export default ErrorSection;