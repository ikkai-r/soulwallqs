import React, { useEffect } from 'react';
import Image from 'next/image';

export default function SpatialPage({selectedTask, responses, setResponses, setEntryTime}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    useEffect(() => {
      setEntryTime?.(Date.now()); 
    }, [setEntryTime]);
  

  const inputPositions = [
    { id: '1', top: 'top-80', ml: 'ml-119.5' },
    { id: '2', top: 'top-80', ml: 'ml-129.5' },
    { id: '3', top: 'top-80', ml: 'ml-139' },
    { id: '4', top: 'top-80', ml: 'ml-148.5' },
    { id: '5', top: 'top-80', ml: 'ml-158.5' },
    { id: '6', top: 'top-96', ml: 'ml-191.5' },
    { id: '7', top: 'top-96', ml: 'ml-215.5' },
    { id: '8', top: 'top-96', ml: 'ml-238.5' },
    { id: '9', top: 'top-96', ml: 'ml-261' },
    { id: '10', top: 'top-96', ml: 'ml-283.5' },
    { id: '11', top: 'top-96', ml: 'ml-297.75' },
    { id: '12', top: 'top-109', ml: 'ml-297.75' },
    { id: '13', top: 'top-120', ml: 'ml-297.75' },
    { id: '14', top: 'top-132', ml: 'ml-297.75' },
    { id: '15', top: 'top-143', ml: 'ml-297.75' },
    { id: '16', top: 'top-145.5', ml: 'ml-286' },
    { id: '17', top: 'top-145.5', ml: 'ml-257' },
    { id: '18', top: 'top-145.5', ml: 'ml-224' },
    { id: '19', top: 'top-145.5', ml: 'ml-187.5' },
    { id: '20', top: 'top-145.5', ml: 'ml-150' },
  ];

    return (
      <div className="flex justify-center items-center w-full">
         <div className="flex justify-center items-center group flex-col mt-10">
          <p>Type in the painting's corresponding letter in the appropriate blank slot in the map.</p>
         <div className="relative mt-10">
         {selectedTask === 'SoulWall' ? (
           <Image
           src={'/img/spatialtest.jpg'}
           alt={`Spatial Test`}
           width={2000}
           height={2000}
           className="w-full h-full object-cover" 
         />
          ) : (
            <Image
            src={'/img/spatialtest2.jpg'}
            alt={`Spatial Test`}
            width={2000}
            height={2000}
            className="w-full h-full object-cover" 
          />
          )}
          
            {inputPositions.map((input) => (
            <input
              key={input.id}
              type="text"
              autoComplete="off"
              name={input.id}
              id={input.id}
              maxLength={1}
              onChange={handleChange}
              value={responses[input.id] || ''}
              className={`absolute transform w-1/65 ${input.top} ${input.ml} text-center text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600`}
            />
          ))}
          </div>
                       
          </div>
      </div>
    );
  }
  