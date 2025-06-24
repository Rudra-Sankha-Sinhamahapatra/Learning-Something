'use client'
import { useCounterStore } from "@/providers/counter-store-providers";


export default function Home() {
  const { count, incrementCount, decrementCount } = useCounterStore(
    (state) => state
  )

  return (
   <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-2xl font-bold mb-16">Counter Strike</h1>
   <p className="mb-8"> Count: {count}</p>
    <div className="flex gap-2">
    <button type="button" onClick={incrementCount} className="button">
      +
    </button>
    <button type="button" onClick={decrementCount} className="button">
     -
    </button>
    </div>
   </div>
  );
}
