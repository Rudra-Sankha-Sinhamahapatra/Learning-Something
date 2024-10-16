/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";

export const Card = () => {
  const [dialogue, setDialogue] = useState<boolean>(false);
  const [name,setName] = useState("");

  const handleDialogue = () => {
    if(name.length!==0){
    setDialogue(!dialogue);
    }
    else {
        setDialogue(false);
    }
  };

  return (
    <div className="relative flex 2xl:flex-row flex-col xl:gap-2">
      <div className="text-white  border border-white shadow-lg shadow-white p-10">
        <div className="w-full flex flex-col gap-4">
          <h1 className="font-bold text-center my-2">Hello John</h1>
          <input
            type="text"
            className="p-4 text-white bg-black"
            placeholder="Enter your name"
            value={name}
            onChange={(e)=>{
                setName(e.target.value);
            }}
          />
          <button
            className="border border-white shadow-blue-500 hover:bg-blue-600 shadow-lg py-2"
            onClick={handleDialogue}
          >
            Click here
          </button>
        </div>
      </div>
      {dialogue && (
        <div className="absolute xl:right-[-500px] right-0 top-[300px] xl:top-0">
        <div className="flex flex-col justify-center border border-white shadow-white shadow-lg items-center px-0 py-10 xl:py-24">
          <h1 className="w-2/4 font-bold text-white break-words">
            You have successfully registered in the course
          </h1>
        </div>
        </div>
      )}
    </div>
  );
};
