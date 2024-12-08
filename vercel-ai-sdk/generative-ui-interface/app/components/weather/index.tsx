type WeatherProps = {
  temperature: number;
  weather: string;
  location: string;
};

export const Weather = ({ temperature, weather, location }: WeatherProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-xl max-w-xs mx-auto text-white">
      <h2 className="text-2xl font-semibold mb-4">{`Current Weather for ${location}`}</h2>
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-lg">🌤️</span>
        <p className="text-xl font-medium">{weather}</p>
      </div>
      <div className="text-4xl font-bold">
        <p>{temperature}°C</p>
      </div>
      <div className="mt-4 flex justify-center">
        <button className="px-4 py-2 bg-white text-blue-500 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all">
          More Info
        </button>
      </div>
    </div>
  );
};
