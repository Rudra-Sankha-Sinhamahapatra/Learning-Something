import axios from "axios";
import { useState, useEffect } from "react";
import "./index.css"; 

type postalInfo = {
  Name:string;
  District:string;
  State:string;
  Country:string
}

export default function App() {
  const [pinCode, setPinCode] = useState<string>(""); 
  const [postalInfo, setPostalInfo] = useState<postalInfo | null>(null); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    if (!pinCode) return;

    const getData = setTimeout(async () => {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pinCode}`);
        const data = response.data[0];

        if (data?.Status === "Success" && data.PostOffice) {
          setPostalInfo(data.PostOffice[0]); 
          setError(null); 
        } else {
          setPostalInfo(null);
          setError("No information found for this postal code."); 
        }
      } catch {
        setPostalInfo(null);
        setError("Failed to fetch data. Please try again later."); 
      }
    }, 2000); 

    return () => clearTimeout(getData);
  }, [pinCode]); 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Postal Code Lookup</h1>
      <input
        className="p-3 text-lg border-2 border-blue-500 rounded-md w-full max-w-xs outline-none transition-all duration-300 focus:border-blue-700 focus:shadow-md placeholder-gray-500"
        placeholder="Enter Postal Code..."
        onChange={(e) => setPinCode(e.target.value)} 
      />
      <div className="mt-6 w-full max-w-xs">
        {error && <p className="text-red-500">{error}</p>}
        {postalInfo && (
          <div className="p-4 border border-gray-300 rounded-md bg-white shadow-md">
            <h2 className="text-lg font-semibold mb-2">Postal Information</h2>
            <p><strong>Name:</strong> {postalInfo.Name}</p>
            <p><strong>District:</strong> {postalInfo.District}</p>
            <p><strong>State:</strong> {postalInfo.State}</p>
            <p><strong>Country:</strong> {postalInfo.Country}</p>
          </div>
        )}
      </div>
    </div>
  );
}
