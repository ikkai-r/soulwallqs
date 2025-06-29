
import React, { useEffect, useRef } from 'react';

export default function NASAPage({responses, setResponses, editable, selectedTask, onValidationChange}) {

  const requiredFields = ['task', 'mentalDemand', 'physicalDemand', 'temporalDemand', 'performance', 'effort', 'frustration'];
  const startTimeRef = useRef(Date.now());
  const timeRecordedRef = useRef(false);

  useEffect(() => {
      const allFilled = requiredFields.every((field) => responses[field] && responses[field] !== "");
      onValidationChange(allFilled);

      if (allFilled && !timeRecordedRef.current) {
        const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setResponses(prev => ({ ...prev, timesecs: elapsedSeconds }));
        timeRecordedRef.current = true;  // prevent recording time again
      }
    }, [responses, onValidationChange, requiredFields, setResponses]);

  useEffect(() => {
    if (!editable) {
      setResponses(prev => ({ ...prev, task: selectedTask }));
    }
  }, [editable, selectedTask]);

  const handleSliderChange = (e) => {
    setResponses((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-10 gap-12 font-[family-name:var(--font-geist-sans)] w-full">
      <p className="text-xl">NASA TLX - Task Load Index</p>
      <p className="text-base">
        Please rate your experience on the following dimensions. Use the slider to indicate your rating from 0 (very low) to 100 (very high).
      </p>

      <form className="mx-auto w-1/2 flex flex-col gap-16">
        
        <div className="w-full">
                <label htmlFor="task" className="block mb-2 text-sm font-medium text-gray-900">Task</label>
                  <select
                      id="task"
                      name="task"
                      value={selectedTask || ''}
                      onChange={(e) => 
                        editable && 
                        setResponses(prev => ({ ...prev, task: e.target.value }))}
                      disabled={!editable}
                      className=" w-full bg-gray-50 border border-0.5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    >
                    <option disabled value="">Select your task</option>
                    <option>SoulWall</option>
                    <option>Map</option>
                  </select>
              </div>

        <div className='w-full flex flex-row gap-5 items-center justify-center'>

        
            <div className="w-full">
              <label htmlFor="mentalDemand" className="block mb-2 text-base font-medium text-gray-900">
                Mental Demand
              </label>
              <p className='text-sm mb-5'>How mentally demanding was the task?</p>
              <input
                type="range"
                id="mentalDemand"
                name="mentalDemand"
                min="0"
                max="100"
                step="5"
                value={responses.mentalDemand || ''}
                onChange={handleSliderChange}
                className="w-full"
              />
              <div className="flex justify-between">
                <span>Very Low</span>
                <span>Very High</span>
              </div>
            </div>

            <div className="mt-10 ml-10">
            {responses.mentalDemand || ''}
            </div>
        </div>
    
        <div className='w-full flex flex-row gap-5 items-center justify-center'>
        
          <div className="w-full">
            <label htmlFor="physicalDemand" className="block mb-2 text-base font-medium text-gray-900">
              Physical Demand
            </label>
            <p className='text-sm mb-5'>How physically demanding was the task?</p>
            <input
              type="range"
              id="physicalDemand"
              name="physicalDemand"
              min="0"
              max="100"
              step="5"
              value={responses.physicalDemand || ''}
              onChange={handleSliderChange}
              className="w-full"
            />
            <div className="flex justify-between">
              <span>Very Low</span>
              <span>Very High</span>
            </div>
          </div>

          <div className="mt-10 ml-10">
          {responses.physicalDemand || ''}
          </div>

      </div>

        <div className='w-full flex flex-row gap-5 items-center justify-center'>
        
          <div className="w-full">
            <label htmlFor="temporalDemand" className="block mb-2 text-base font-medium text-gray-900">
              Temporal Demand
            </label>
            <p className='text-sm mb-5'>How hurried or rushed was the pace of the task?</p>
            <input
              type="range"
              id="temporalDemand"
              name="temporalDemand"
              min="0"
              max="100"
              step="5"
              value={responses.temporalDemand || ''}
              onChange={handleSliderChange}
              className="w-full"
            />
            <div className="flex justify-between">
              <span>Very Low</span>
              <span>Very High</span>
            </div>
          </div>

          <div className="mt-10 ml-10">
          {responses.temporalDemand || ''}
          </div>
          
      </div>

      <div className='w-full flex flex-row gap-5 items-center justify-center'>
        
        <div className="w-full">
          <label htmlFor="performance" className="block mb-2 text-base font-medium text-gray-900">
            Performance
          </label>
          <p className='text-sm mb-5'>How successful were you in accomplishing what you were asked to do?</p>
          <input
            type="range"
            id="performance"
            name="performance"
            min="0"
            max="100"
            step="5"
            value={responses.performance || ''}
            onChange={handleSliderChange}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>Very Low</span>
            <span>Very High</span>
          </div>
        </div>

        <div className="mt-10 ml-10">
        {responses.performance || ''}
        </div>
        
    </div>

      <div className='w-full flex flex-row gap-5 items-center justify-center'>
        
        <div className="w-full">
          <label htmlFor="effort" className="block mb-2 text-base font-medium text-gray-900">
            Effort
          </label>
          <p className='text-sm mb-5'>How hard did you have to work to accomplish your level of performance?</p>
          <input
            type="range"
            id="effort"
            name="effort"
            min="0"
            max="100"
            step="5"
            value={responses.effort || ''}
            onChange={handleSliderChange}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>Very Low</span>
            <span>Very High</span>
          </div>
        </div>

        <div className="mt-10 ml-10">
        {responses.effort || ''}
        </div>
        
    </div>

    <div className='w-full flex flex-row gap-5 items-center justify-center'>
        
        <div className="w-full">
          <label htmlFor="frustration" className="block mb-2 text-base font-medium text-gray-900">
            Frustration
          </label>
          <p className='text-sm mb-5'>How insecure, discouraged, irritated, stressed, and annoyed were you?</p>
          <input
            type="range"
            id="frustration"
            name="frustration"
            min="0"
            max="100"
            step="5"
            value={responses.frustration || ''}
            onChange={handleSliderChange}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>Very Low</span>
            <span>Very High</span>
          </div>
        </div>

        <div className="mt-10 ml-10">
        {responses.frustration || ''}
        </div>
        
    </div>


      </form>

   
    </div>
  );
}
