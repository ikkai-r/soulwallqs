import { useEffect, useState } from "react";
import LikertQ from "../components/LikertQ";

export default function UEQSPage({ onValidationChange }) {
  const [responses, setResponses] = useState({});

  const requiredFields = Array.from({ length: 8 }, (_, i) => `q${i + 1}`);

  const handleChange = (e) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const allFilled = requiredFields.every((field) => responses[field] && responses[field] !== "");
    onValidationChange(allFilled); 
  }, [responses, onValidationChange]);

    return (
      <div className="flex flex-col items-center min-h-screen p-10 gap-16 font-[family-name:var(--font-geist-sans)] w-full ">
        <div className="flex flex-col items-center gap-5 w-full text-center">
        <p className='text-xl'>UEQ-S</p>
        <p className='text-base'>
        The user experience questionnaire evaluates users' subjective perceptions and overall impressions of the prototype's user experience. Mark on each scale at the point that best indicates your experience of the prototype.</p>
        </div>
       
        <form className="mx-auto w-1/2 flex flex-col gap-10">
          <LikertQ
            question=""
            name="q1"
            onChange={handleChange}
            first={"obstructive"}
            last={"supportive"}
          />
          <LikertQ
            question=""
            name="q2"
            onChange={handleChange}
            first={"complicated"}
            last={"easy"}
          />
          <LikertQ
            question=""
            name="q3"
            onChange={handleChange}
            first={"inefficient"}
            last={"efficient"}
          />
          <LikertQ
            question=""
            name="q4"
            onChange={handleChange}
            first={"clear"}
            last={"confusing"}
          />
          <LikertQ
            question=""
            name="q5"
            onChange={handleChange}
            first={"boring"}
            last={"exciting"}
          />
          <LikertQ
            question=""
            name="q6"
            onChange={handleChange}
            first={"not interesting"}
            last={"interesting"}
          />
          <LikertQ
            question=""
            name="q7"
            onChange={handleChange}
            first={"conventional"}
            last={"inventive"}
          />
          <LikertQ
            question=""
            name="q8"
            onChange={handleChange}
            first={"usual"}
            last={"leading edge"}
          />
         
        </form>
       

     </div>
    );
  }
  