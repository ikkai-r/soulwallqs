import { useEffect } from "react";

import SSQ from "../components/SSQ";
export default function SSQPage({ onValidationChange, responses, setResponses }) {
     const requiredFields = Array.from({ length: 16 }, (_, i) => `q${i + 1}`);

  const handleChange = (e) => {
    setResponses({
      ...responses,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
      const allFilled = requiredFields.every((field) => responses[field] && responses[field] !== "");
      onValidationChange(allFilled);
    }, [responses, onValidationChange, requiredFields]);


   
       return (
         <div className="flex flex-col items-center min-h-screen p-10 gap-16 font-[family-name:var(--font-geist-sans)] w-full ">
           <div className="flex flex-col items-center gap-5 w-full text-center">
           <p className='text-xl'>Simulator Sickness Questionnaire</p>
           <p className='text-base'>
           Please rate your experience on the following dimensions. Select the statement that strongly identifies with your rating.</p>
           </div>
          
           <form className="mx-auto w-1/2 flex flex-col gap-10">
                <SSQ
                            question="General discomfort"
                            name="q1"
                            onChange={handleChange}
                            value={responses.q1 || ""}
                    />
                <SSQ
                            question="Fatigue"
                            name="q2"
                            onChange={handleChange}
                            value={responses.q2 || ""}
                    />
                  <SSQ
                          question="Headache"
                          name="q3"
                          onChange={handleChange}
                          value={responses.q3 || ""}
                  />
                  <SSQ
                          question="Eye strain"
                          name="q4"
                          onChange={handleChange}
                          value={responses.q4 || ""}
                  />
                  <SSQ
                          question="Difficulty focusing"
                          name="q5"
                          onChange={handleChange}
                          value={responses.q5 || ""}
                  />
                  <SSQ
                          question="Increased salivation"
                          name="q6"
                          onChange={handleChange}
                          value={responses.q6 || ""}
                  />
                  <SSQ
                          question="Sweating"
                          name="q7"
                          onChange={handleChange}
                          value={responses.q7 || ""}
                  />
                  <SSQ
                          question="Nausea"
                          name="q8"
                          onChange={handleChange}
                          value={responses.q8 || ""}
                  />
                  <SSQ
                          question="Difficulty concentrating"
                          name="q9"
                          onChange={handleChange}
                          value={responses.q9 || ""}
                  />
                  <SSQ
                          question="Fullness of the head"
                          name="q10"
                          onChange={handleChange}
                          value={responses.q10 || ""}
                  />
                  <SSQ
                          question="Blurred vision"
                          name="q11"
                          onChange={handleChange}
                          value={responses.q11 || ""}
                  />
                  <SSQ
                          question="Dizzy (eyes open)"
                          name="q12"
                          onChange={handleChange}
                          value={responses.q12 || ""}
                  />
                  <SSQ
                          question="Dizzy (eyes closed)"
                          name="q13"
                          onChange={handleChange}
                          value={responses.q13 || ""}
                  />
                  <SSQ
                          question="Vertigo (Giddiness)"
                          name="q14"
                          onChange={handleChange}
                          value={responses.q14 || ""}
                  />
                  <SSQ
                          question="Stomach awareness"
                          name="q15"
                          onChange={handleChange}
                          value={responses.q15 || ""}
                  />
                  <SSQ
                          question="Burping"
                          name="q16"
                          onChange={handleChange}
                          value={responses.q16 || ""}
                  />
           </form>
          
   
        </div>
       );
  }
  