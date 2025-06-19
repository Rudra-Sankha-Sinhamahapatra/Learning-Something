import { useEffect, useState } from 'react'
import type { Stock } from './types/Stock'
import { config } from './lib/config';

function App() {
  const [stock, setStock] = useState<Stock | null>(null);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

  useEffect(() => {
    const ws = new WebSocket(config.wsUrl);
    
    ws.onopen = () => {
      console.log('Connected to WebSocket');
      setStatus('connected');
    };

    ws.onmessage = (event) => {
      const data: Stock = JSON.parse(event.data);
      setStock(data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatus('error');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setStatus('error');
    };

    return () => ws.close();
  }, []);

  return (
    <>
      <div className='p-10 text-center font-mono'>
        <h1 className='text-2xl font-bold mb-4'>LIVE STOCK TRACKER</h1>
        <div className='mb-4'>
          Status: <span className={status === 'connected' ? 'text-green-500' : 'text-red-500'}>
            {status}
          </span>
        </div>
        {status === 'error' && (
          <div className='text-red-500 mb-4'>
            Failed to connect to WebSocket server. Please check if the server is running.
          </div>
        )}
        {stock && status === 'connected' && (
          <div className='border p-4 rounded-lg shadow-md'>
            <p className='text-xl font-bold'>{stock.symbol}</p>
            <p className={`text-2xl ${Number(stock.price) > 290 ? 'text-green-600' : 'text-red-600'}`}>${stock.price}</p>
            <p className='text-gray-500'>{stock.time}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
