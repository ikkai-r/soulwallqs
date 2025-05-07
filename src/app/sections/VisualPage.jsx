import VisualComp from "../components/VisualComp";

export default function VisualPage({selectedTask}) {

  const soulWallImgs = [
    { id: 1, src: '/img/1.png', alt: 'Option 1' },
    { id: 2, src: '/img/23.png', alt: 'Option 2' },
    { id: 3, src: '/img/25.jpg', alt: 'Option 3' },
    { id: 4, src: '/img/32.jpg', alt: 'Option 4' },
    { id: 5, src: '/img/16.jpg', alt: 'Option 5' },
    { id: 6, src: '/img/27.jpg', alt: 'Option 6' },
    { id: 7, src: '/img/36.jpg', alt: 'Option 7' },
    { id: 8, src: '/img/26.jpg', alt: 'Option 8' },
    { id: 9, src: '/img/11.jpg', alt: 'Option 9' },
    { id: 10, src: '/img/12.jpg', alt: 'Option 10' },
    { id: 11, src: '/img/6.png', alt: 'Option 11' },
    { id: 12, src: '/img/19.jpg', alt: 'Option 12' },
    { id: 13, src: '/img/8.png', alt: 'Option 13' },
    { id: 14, src: '/img/17.jpg', alt: 'Option 14' },
    { id: 15, src: '/img/41.png', alt: 'Option 15' },
    { id: 16, src: '/img/13.jpg', alt: 'Option 16' },
    { id: 17, src: '/img/37.jpg', alt: 'Option 17' },
    { id: 18, src: '/img/42.png', alt: 'Option 18' },
    { id: 19, src: '/img/28.jpg', alt: 'Option 19' },
    { id: 20, src: '/img/34.jpg', alt: 'Option 20' },
  ];

  const mapImgs = [
    { id: 1, src: '/img/18.png', alt: 'Map Option 1' },
    { id: 2, src: '/img/9.png', alt: 'Map Option 2' },
    { id: 3, src: '/img/3.png', alt: 'Map Option 3' },
    { id: 4, src: '/img/30.jpg', alt: 'Map Option 4' },
    { id: 5, src: '/img/5.png', alt: 'Map Option 5' },
    { id: 6, src: '/img/20.jpg', alt: 'Map Option 6' },
    { id: 7, src: '/img/33.jpg', alt: 'Map Option 7' },
    { id: 8, src: '/img/15.jpg', alt: 'Map Option 8' },
    { id: 9, src: '/img/39.jpg', alt: 'Map Option 9' },
    { id: 10, src: '/img/4.png', alt: 'Map Option 10' },
    { id: 11, src: '/img/21.png', alt: 'Map Option 11' },
    { id: 12, src: '/img/7.png', alt: 'Map Option 12' },
    { id: 13, src: '/img/22.png', alt: 'Map Option 13' },
    { id: 14, src: '/img/38.jpg', alt: 'Map Option 14' },
    { id: 15, src: '/img/2.png', alt: 'Map Option 15' },
    { id: 16, src: '/img/31.jpg', alt: 'Map Option 16' },
    { id: 17, src: '/img/24.jpg', alt: 'Map Option 17' },
    { id: 18, src: '/img/10.png', alt: 'Map Option 18' },
    { id: 19, src: '/img/14.jpg', alt: 'Map Option 19' },
    { id: 20, src: '/img/35.jpg', alt: 'Map Option 20' },
  ];

    return (
      <div>
      {selectedTask === 'SoulWall' ? (
        <VisualComp imageOptions={soulWallImgs} />
      ) : (
        <VisualComp imageOptions={mapImgs} />
      )}
    </div>
    );
  }
  