import React from 'react';
import Image from 'next/image';


const VisualComp = ({ imageOptions, responses, setResponses }) => {
  
 const handleCheckboxChange = (id) => {
  setResponses(prev => {
    const selectedIds = prev?.selectedIds || [];
    const updatedSelected = selectedIds.includes(id)
      ? selectedIds.filter(item => item !== id)
      : [...selectedIds, id];

    return {
      ...prev,
      selectedIds: updatedSelected,
    };
  });
};


  return (
    <fieldset>
      <div className='grid grid-cols-4 gap-4'>
        {imageOptions.map(({ id, src, alt }) => (
          <div key={id} className="flex items-center mb-4">
            <input
              id={`checkbox-${id}`}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
              checked={responses.selectedIds?.includes(id) || false}
              onChange={() => handleCheckboxChange(id)}
            />
            <Image
              src={src}
              alt={alt}
              width={300}
              height={300}
              className="object-contain ml-4"
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default VisualComp;