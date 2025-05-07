import Image from 'next/image';

export default function TextualPage({selectedTask, responses, setResponses}) {
  const imageList = [
    '1.png', '2.png', '3.png', '4.png', '5.png',
    '6.png', '7.png', '8.png', '9.png', '10.png',
    '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg',
    '16.jpg', '17.jpg', '18.png', '19.jpg', '20.jpg'
  ];

  const imageList2 = [
    '17.jpg', '5.png', '10.png', '1.png', '14.jpg',
    '3.png', '18.png', '8.png', '12.jpg', '9.png',
    '6.png', '19.jpg', '13.jpg', '20.jpg', '2.png',
    '11.jpg', '7.png', '16.jpg', '15.jpg', '4.png'
  ];

  const handleChange = (e, index) => {
    setResponses(prev => ({
      ...prev,
      [`art${index + 1}`]: e.target.value,
    }));
  };

    return (
      <div className="flex flex-col items-center min-h-screen p-10 gap-12 font-[family-name:var(--font-geist-sans)] w-full">

        <p>Please type the names or the titles of the artworks in the space below. If you do not remember them, leave them empty.</p>

           <form className='grid grid-cols-4 gap-32 w-full'>

              {(selectedTask === 'SoulWall' ? imageList : imageList2).map((filename, index) => (
                <div key={index} className="relative z-0 w-full mb-5 group">
                  <Image
                    src={`/img/${filename}`}
                    alt={`Image ${index + 1}`}
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                  <input
                    type="text"
                    name={`art${index + 1}`}
                    id={`art${index + 1}`}
                    className="block py-2.5 px-0 w-full mt-2 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                    placeholder=""
                    value={responses[`art${index + 1}`] || ''}
                    onChange={(e) => handleChange(e, index)}
                  />
              </div>
            ))}
          </form>
      </div>
    );
  }
  