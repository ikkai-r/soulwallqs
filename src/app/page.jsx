'use client';
import { useState } from 'react';
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
  const [visualResponses, setVisualResponses] = useState({});
  const [spatialResponses, setSpatialResponses] = useState({});
  const [textualResponses, setTextualResponses] = useState({});
  const [ueqsResponses, setUEQSResponses] = useState({});
  const [nasaResponses, setNASAResponses] = useState({});
  const [entryTime, setEntryTime] = useState(null);

  const [currentSection, setCurrentSection] = useState(0);

  const [isValid, setIsValid] = useState(false);
  const selectedTask = nasaResponses.task;

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
      requiresValidation: true 
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
      requiresValidation: false,
    },
    {
          component: () => (
            <BufferPage text={`Please proceed to perform Task 1 before continuing.`} />
          ),
          requiresValidation: false,
        },
        {
          component: () => (
            <NASAPage
              responses={nasaResponses}
              setResponses={setNASAResponses}
              selectedTask={selectedTask}
              editable={true}
              onValidationChange={setIsValid}
            />
          ),
          requiresValidation: true,
        },
        {
          component: () => (
            <SSQPage
              responses={ssqResponses}
              setResponses={setSSQResponses}
              selectedTask={selectedTask}
              onValidationChange={setIsValid}
            />
          ),
          requiresValidation: true,
        },
        {
          component: () => (
            <VisualPage
              responses={visualResponses}
              setResponses={setVisualResponses}
              selectedTask={selectedTask}
              setEntryTime={setEntryTime}
                          />
          ),
          requiresValidation: false,
          name: "VisualPage",
        },
        {
          component: () => (
            <SpatialPage
              responses={spatialResponses}
              setResponses={setSpatialResponses}
              selectedTask={selectedTask}
              setEntryTime={setEntryTime}
            />
          ),
          requiresValidation: false,
          name: "SpatialPage",
        },
        {
          component: () => (
            <TextualPage
              responses={textualResponses}
              setResponses={setTextualResponses}
              selectedTask={selectedTask}
              setEntryTime={setEntryTime}
                          />
          ),
          requiresValidation: false,
          name: "TextualPage",
        },
        {
          component: () => (
            <UEQSPage
              responses={ueqsResponses}
              setResponses={setUEQSResponses}
              selectedTask={selectedTask}
              onValidationChange={setIsValid}
            />
          ),
          requiresValidation: true,
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

    const now = Date.now();
    const duration = entryTime ? Math.floor((now - entryTime) / 1000) : 0;

    const current = sections[currentSection];

    if (current.requiresValidation && !isValid) {
      alert('Please complete all required fields before continuing.');
      return;
    }

    if (current.name === "VisualPage") {
      setVisualResponses(prev => ({
          ...prev,
          timesecs: duration,
        }));
    } else if (current.name === "SpatialPage") {
      setSpatialResponses(prev => ({
          ...prev,
          timesecs: duration,
        }));
    } else if (current.name === "TextualPage") {
      setTextualResponses(prev => ({
          ...prev,
          timesecs: duration,
        }));
    }

    setEntryTime(null);
    setCurrentSection((prev) => prev + 1);
  };

  /**
   * 
   *   const handlePrevious = () => {
    setCurrentSection((prev) => prev - 1);
  };
   */


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
  
    try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: allData,
      }),
    });

    if (response.status === 200) {

      alert('Data submitted successfully!');
      setCurrentSection(sections.length - 1);
    } else {
      alert(`Error: 'Something went wrong!'`);
    }
  } catch (error) {
    alert(`Error: ${error.message || 'Failed to submit data!'}`);
  }
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
{/* 
          {currentSection > 0 && (
            <button
              onClick={handlePrevious}
              className="fixed bottom-10 left-10 px-10 py-5 bg-black text-white rounded text-xl cursor-pointer"
            >
              Previous
            </button>
          )} */}

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
