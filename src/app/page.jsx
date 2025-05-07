'use client';
import { useState } from 'react';
import DemoPage from './sections/DemoPage';
import SBPage from './sections/SBPage';
import NASAPage from './sections/NASAPage';
import SSQPage from './sections/SSQPage';
import VisualPage from './sections/VisualPage';
import SpatialPage from './sections/SpatialPage';
import TextualPage from './sections/TextualPage';
import UEQSPage from './sections/UEQSPage';
import BufferPage from './sections/BufferPage';

export default function Home() {

  const [demoResponses, setDemoResponses] = useState({});
  const [sbResponses, setsbResponses] = useState({});
  const [ssqResponses, setSSQResponses] = useState({});
  const [visualResponses, setVisualResponses] = useState([]);
  const [spatialResponses, setSpatialResponses] = useState({});
  const [textualResponses, setTextualResponses] = useState({});
  const [ueqsResponses, setUEQSResponses] = useState({});
  const [nasaResponses, setNASAResponses] = useState({});

  const [currentSection, setCurrentSection] = useState(0);

  const [isValid, setIsValid] = useState(false);


  console.log('textualResponses', textualResponses);


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
    { 
      component: (props) => (
        <VisualPage 
          selectedTask={demoResponses.demoTask}
          responses={visualResponses}
          setResponses={setVisualResponses}
          onValidationChange={setIsValid}
          {...props}
        />
      ), 
      requiresValidation: false 
    },
    { 
      component: (props) => (
        <SpatialPage 
          selectedTask={demoResponses.demoTask}
          responses={spatialResponses}
          setResponses={setSpatialResponses}
          onValidationChange={setIsValid}
          {...props}
        />
      ), 
      requiresValidation: false 
    },
    { 
      component: (props) => (
        <TextualPage 
          selectedTask={demoResponses.demoTask}
          responses={textualResponses}
          setResponses={setTextualResponses}
          onValidationChange={setIsValid}
          {...props}
        />
      ), 
      requiresValidation: false 
    },
    
    { 
      component: (props) => (
        <NASAPage 
          selectedTask={demoResponses.demoTask}
          responses={nasaResponses}
          setResponses={setNASAResponses}
          onValidationChange={setIsValid}
          {...props}
        />
      ), 
      requiresValidation: false 
    },
    { 
      component: (props) => (
        <SSQPage 
          selectedTask={demoResponses.demoTask}
          responses={ssqResponses}
          setResponses={setSSQResponses}
          onValidationChange={setIsValid}
          {...props}
        />
      ), 
      requiresValidation: false 
    },
    { 
      component: (props) => (
        <UEQSPage 
          selectedTask={demoResponses.demoTask}
          responses={ueqsResponses}
          setResponses={setUEQSResponses}
          onValidationChange={setIsValid}
          {...props}
        />
      ), 
      requiresValidation: false 
    },
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

        </div>
    </div>
  );
}
