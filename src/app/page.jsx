
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

export default function Home() {
  const sections = [<DemoPage key="demo" />,
                    <SBPage key="sb" />,
                    <NASAPage key="nasa" />,
                    <SSQPage key="ssq" />,
                    <VisualPage key="visual" />,
                    <SpatialPage key="spatial" />,
                    <TextualPage key="textual" />,
                    <UEQSPage key="ueqs" />];

  const [currentSection, setCurrentSection] = useState(0);

  const handleNext = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <p className='text-4xl font-semibold'>SoulWall</p>

        <div className='w-full px-10 py-5 bg-zinc-200 rounded-lg shadow-lg'> 
          {sections[currentSection]}
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
