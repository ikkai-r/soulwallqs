
import { useEffect, useState } from 'react';

export default function DemoPage({ onValidationChange }) {

  const [responses, setResponses] = useState({});

  const requiredFields = ['age', 'sex', 'hand', 'VRf'];

  useEffect(() => {
    const allFilled = requiredFields.every((field) => responses[field] && responses[field] !== "");
    onValidationChange(allFilled); 
  }, [responses, onValidationChange]);

  const handleChange = (e) => {
    setResponses((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

    return (
      <div className="flex flex-col items-center min-h-screen p-10 gap-10 font-[family-name:var(--font-geist-sans)] w-full ">
        <p className='text-xl '>Demographic and VR Familiarity</p>
          <form className="mx-auto w-1/2 flex flex-col gap-5">
            <div className="w-full">
                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">Age</label>
                <input type="number" onChange={handleChange} id="age" name="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "/>
            </div>
            <div className="w-full">
            <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-900 ">Sex</label>
              <select id="sex" name="sex" defaultValue="" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-[var(--font-geist-sans)]">
                <option disabled value="">Select your sex</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="w-full">
               <label htmlFor="hand" className="block mb-2 text-sm font-medium text-gray-900 ">Lefthanded or Righthanded?</label>
                <select id="hand" name="hand" defaultValue="" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option disabled value="">Select your dominant hand</option>
                  <option>Left</option>
                  <option>Right</option>
                </select>
            </div>
            <div className="w-full">
              <label htmlFor="VRf"  className="block mb-2 text-sm font-medium text-gray-900 ">Have you used VR before?</label>
                <select id="VRf" name="VRf" defaultValue="" onChange={handleChange}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option disabled value="">Select yes or no</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
            </div>
        </form>
      </div>
    );
  }
  