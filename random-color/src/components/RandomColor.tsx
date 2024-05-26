import { useState } from "react";

export default function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  const generateColor: () => string = () => {
    if (typeOfColor === "hex") {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    } else if (typeOfColor === "rgb") {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r},${g},${b})`;
    }
    return "";
  };
  return (
    <>
      <div
        className="w-screen h-screen m-0 p-0 flex flex-col text-center items-center justify-center"
        style={{ background: color }}
      >
        <div className="gap-3 flex ">
          <button
            className="bg-white text-black p-2 border-l hover:bg-blue-300 focus:outline-2"
            onClick={() => {
              setTypeOfColor("hex");
              setColor(generateColor());
            }}
          >
            Create HEX Color
          </button>
          <button
            className="bg-white border-l p-2 hover:bg-red-300 focus:outline-2"
            onClick={() => {
              setTypeOfColor("rgb");
              setColor(generateColor());
            }}
          >
            Create RGB Color
          </button>
          <button
            className="bg-white p-2 border-l hover:bg-green-400 focus:outline-2"
            onClick={() => setColor(generateColor())}
          >
            Create Random Color
          </button>
        </div>
        <div className="mt-6 bg-white w-fit p-2 text-center">
        {color}
        </div>
      </div>
    </>
  );
}
