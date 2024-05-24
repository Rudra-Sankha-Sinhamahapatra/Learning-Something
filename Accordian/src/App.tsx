import { useState } from 'react';
import data from './data';

function App() {
  const [selected, setSelected] = useState(null);

  function handleClick(id:any) {
    setSelected(selected === id ? null : id);
  }

  return (
    <div className='flex justify-center'>
      <div className='w-full max-w-md'>
        {data && data.length > 0 ? (
          data.map(dataItem => (
            <div key={dataItem.id} className='border border-gray-300 rounded-lg mb-4'>
              <div
                onClick={() => handleClick(dataItem.id)}
                className='flex items-center justify-between px-4 py-3 cursor-pointer bg-gray-100'
              >
                <h3 className='font-semibold'>{dataItem.question}</h3>
                <span className='text-xl'>{selected === dataItem.id ? '-' : '+'}</span>
              </div>
              {selected === dataItem.id ?(
                <div className='px-4 py-3 bg-white'>
                  <p className='text-gray-700'>{dataItem.answer}</p>
                </div>
              ):null}
            </div>
          ))
        ) : (
          <div className='px-4 py-3 bg-gray-100 text-gray-700 rounded-lg'>
            No data found
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
