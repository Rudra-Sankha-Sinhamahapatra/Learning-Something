import { Spinner } from "@material-tailwind/react";
import React from "react";

export default function SpinnerCustomStyles() {
  return <div className="min-h-screen flex justify-center items-center">  
  <Spinner 
  className="h-16 w-16"
  {...({} as any)}
  /> 
    </div>
}
