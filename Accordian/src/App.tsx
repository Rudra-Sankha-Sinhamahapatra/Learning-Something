import { useState } from "react";
import data from "./data";

function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [effect, setEffect] = useState(false);
  const [multi, setMulti] = useState<string[]>([]);

  const handleClick = (id: string) => {
    // Toggle selected item in multi-selection mode
    setMulti((prevMulti) =>
      effect ? (prevMulti.includes(id) ? prevMulti.filter((item) => item !== id) : [...prevMulti, id]) : []
    );

    // Toggle selected item in single selection mode
    setSelected((prevSelected) => (effect ? prevSelected : prevSelected === id ? null : id));
  };

  const effectClick = () => {
    // Toggle multi-selection mode
    setEffect((prevEffect) => !prevEffect);

    // Reset selections when switching modes
    setSelected(null);
    setMulti([]);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md mt-16">
        <div className="flex justify-center">
          <button
            onClick={effectClick}
            className="p-4 bg-gray-200 mb-4 hover:outline-dashed hover:text-white hover:bg-black"
          >
            Multi Selection <span>{effect ? "on" : "off"}</span>
          </button>
        </div>
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div
              key={dataItem.id}
              className="border border-gray-300 rounded-lg mb-4"
            >
              <div
                onClick={() => handleClick(dataItem.id)}
                className="flex items-center justify-between px-4 py-3 cursor-pointer bg-gray-100"
              >
                <h3 className="font-semibold">{dataItem.question}</h3>
                <span className="text-xl">
                  {effect ? (multi.includes(dataItem.id) ? "-" : "+") : (selected === dataItem.id ? "-" : "+")}
                </span>
              </div>
              {(effect && multi.includes(dataItem.id)) || (!effect && selected === dataItem.id) ? (
                <div className="px-4 py-3 bg-white">
                  <p className="text-gray-700">{dataItem.answer}</p>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <div className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg">
            No data found
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
