import { useEffect } from "react";
import LikertQ from "../components/LikertQ";

export default function SBPage({ onValidationChange, responses, setResponses }) {
  const requiredFields = Array.from({ length: 15 }, (_, i) => `q${i + 1}`);

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
        <p className='text-xl'>Santa Barbara Sense-of-Direction Scale</p>
        <p className='text-base'>
            The following statements ask you about your spatial and navigational abilities, preferences, and
              experiences. After each statement, you should select a number to indicate your level of
              agreement with the statement. Select 1 if you strongly agree that the statement applies to you, 7 if you strongly disagree,
              or some number in between if your agreement is intermediate. Circle 4 if you neither agree nor disagree.</p>
        </div>
       
        <form className="mx-auto w-1/2 flex flex-col gap-10">
          <LikertQ
            question="1. I am very good at giving directions."
            name="q1"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q1 || ""}
          />
          <LikertQ
            question="2. I have a poor memory for where I left things."
            name="q2"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q2 || ""}
          />
          <LikertQ
            question="3. I am very good at judging distances."
            name="q3"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q3 || ""}
          />
          <LikertQ
            question="4. My sense of direction is very good."
            name="q4"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q4 || ""}
          />
          <LikertQ
            question="5. I tend to think of my environment in terms of cardinal directions (N,S,E,W)."
            name="q5"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q5 || ""}
          />
          <LikertQ
            question="6. I very easily get lost in a new city."
            name="q6"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q6 || ""}
          />
          <LikertQ
            question="7. I enjoy reading maps."
            name="q7"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q7 || ""}
          />
          <LikertQ
            question="8. I have trouble understanding directions."
            name="q8"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q8 || ""}
          />
          <LikertQ
            question="9. I am very good at reading maps."
            name="q9"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q9 || ""}
          />
          <LikertQ
            question="10. I don't remember routes very well while riding as a passenger in a car."
            name="q10"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q10 || ""}
          />
          <LikertQ
            question="11. I don't enjoy giving directions."
            name="q11"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q11 || ""}
          />
          <LikertQ
            question="12. It's not important to me to know where I am."
            name="q12"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q12 || ""}
          />
          <LikertQ
            question="13. I usually let someone else do the navigational planning for long trips."
            name="q13"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q13 || ""}
          />
          <LikertQ
            question="14. I can usually remember a new route after I have traveled it only once."
            name="q14"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q14 || ""}
          />
          <LikertQ
            question="15. I don't have a very good mental map of my environment."
            name="q15"
            onChange={handleChange}
            first={"Strongly agree"}
            last={"Strongly disagree"}
            value={responses.q15 || ""}
          />
        </form>
     </div>
    );
  }
  