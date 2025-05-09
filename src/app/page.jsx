'use client';
import { useState, useEffect } from 'react';
import DemoPage from './pages/DemoPage';
import SBPage from './pages/SBPage';
import NASAPage from './pages/NASAPage';
import SSQPage from './pages/SSQPage';
import VisualPage from './pages/VisualPage';
import SpatialPage from './pages/SpatialPage';
import TextualPage from './pages/TextualPage';
import UEQSPage from './pages/UEQSPage';
import BufferPage from './pages/BufferPage';

export default function Home() {

  const [demoResponses, setDemoResponses] = useState({});
  const [sbResponses, setsbResponses] = useState({});
  const [ssqResponses, setSSQResponses] = useState({});
  const [visualResponses, setVisualResponses] = useState([]);
  const [spatialResponses, setSpatialResponses] = useState({});
  const [textualResponses, setTextualResponses] = useState({});
  const [ueqsResponses, setUEQSResponses] = useState({});
  const [nasaResponses, setNASAResponses] = useState({});
  const [nasaResponses2, setNASAResponses2] = useState({});

  const [currentSection, setCurrentSection] = useState(0);

  const [isValid, setIsValid] = useState(false);
  
  useEffect(() => {
    if (nasaResponses.task) {
      setSSQResponses((prev) => ({ ...prev, selectedTask: nasaResponses.task }));
      setUEQSResponses((prev) => ({ ...prev, selectedTask: nasaResponses.task }));
    }
  }, [nasaResponses.task]);
  
  const getTaskSequence = (iterationIndex) => {
      const isSecond = iterationIndex === 1;
      const selectedTask = nasaResponses.task;
      console.log('Selected Task:', selectedTask);
      console.log('Iteration Index:', iterationIndex);
      const otherTask = selectedTask === 'SoulWall' ? 'Map' : 'SoulWall';
      console.log('Other Task:', otherTask);


      return [
        {
          component: () => (
            <BufferPage text={`Please proceed to perform Task ${iterationIndex + 1} before continuing.`} />
          ),
          requiresValidation: false,
        },
        {
          component: () => (
            <NASAPage
              responses={isSecond ? nasaResponses2 : nasaResponses}
              setResponses={isSecond ? setNASAResponses2 : setNASAResponses}
              selectedTask={isSecond ? otherTask : selectedTask}
              editable={!isSecond}
              onValidationChange={setIsValid}
            />
          ),
          requiresValidation: false,
        },
        {
          component: () => (
            <SSQPage
              responses={ssqResponses}
              setResponses={setSSQResponses}
              onValidationChange={setIsValid}
            />
          ),
          requiresValidation: false,
        },
        {
          component: () => (
            <VisualPage
              selectedTask={isSecond ? otherTask : selectedTask}
              responses={visualResponses}
              setResponses={setVisualResponses}
              onValidationChange={setIsValid}
            />
          ),
          requiresValidation: false,
        },
        {
          component: () => (
            <SpatialPage
              selectedTask={isSecond ? otherTask : selectedTask}
              responses={spatialResponses}
              setResponses={setSpatialResponses}
              onValidationChange={setIsValid}
            />
          ),
          requiresValidation: false,
        },
        {
          component: () => (
            <TextualPage
              selectedTask={isSecond ? otherTask : selectedTask}
              responses={textualResponses}
              setResponses={setTextualResponses}
              onValidationChange={setIsValid}
            />
          ),
          requiresValidation: false,
        },
        {
          component: () => (
            <UEQSPage
              responses={ueqsResponses}
              setResponses={setUEQSResponses}
              onValidationChange={setIsValid}
            />
          ),
          requiresValidation: false,
        },
      ];
    };


//TODO: Change the requiresValidation to true after testing
  const sections = [
    { 
      component: (props) => (
        <DemoPage 
          responses={demoResponses}
          setResponses={setDemoResponses}
          onValidationChange={setIsValid}
          {...props}
        />
      ), 
      requiresValidation: false 
    },
    { 
      component: (props) => (
        <SBPage 
          responses={sbResponses}
          setResponses={setsbResponses}
          onValidationChange={setIsValid}
          {...props}
        />
      ), 
      requiresValidation: false 
    },
     ...[0, 1].flatMap(i => getTaskSequence(i)),
    { 
      component: (props) => (
        <BufferPage
          text={'Thank you for participating.'}
        />
      ), 
      requiresValidation: false 
    },
  ];

  const handleNext = () => {
    const current = sections[currentSection];

    if (current.requiresValidation && !isValid) {
      alert('Please complete all required fields before continuing.');
      return;
    }
    
    setCurrentSection((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => prev - 1);
  };

  const handleSave = async () => {
    const allData = {
      demoResponses,
      sbResponses,
      ssqResponses,
      visualResponses,
      spatialResponses,
      textualResponses,
      ueqsResponses,
      nasaResponses,
    };
  
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: allData  
      }),
    });
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <p className='text-4xl font-semibold'>SoulWall Questionnaire</p>

        <div className='w-full px-10 py-5 bg-zinc-200 rounded-lg shadow-lg'> 
        {sections[currentSection].component({})}
          {currentSection < sections.length - 1 && (
            <button
              onClick={handleNext}
              className="fixed bottom-10 right-10 px-10 py-5 bg-black text-white rounded text-xl cursor-pointer"
            >
              Next
            </button>
          )}

          {currentSection > 0 && (
            <button
              onClick={handlePrevious}
              className="fixed bottom-10 left-10 px-10 py-5 bg-black text-white rounded text-xl cursor-pointer"
            >
              Previous
            </button>
          )}

          {currentSection === sections.length - 2 && (
            <button
              onClick={handleSave}
              className="fixed bottom-10 right-10 px-10 py-5 bg-emerald-700 text-white rounded text-xl cursor-pointer"
            >
              Submit
            </button>
          )}

        </div>
    </div>
  );
}
