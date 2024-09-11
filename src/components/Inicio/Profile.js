import React, { useState, useEffect } from 'react';
import f250 from './images/f250wpp2.jpg';
import f250cel from './images/f250wppcel.jpg';
import ResponsiveDrawer from './Drawer.js';

function getWindowSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return { width, height };
}

function Profile() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    // Adiciona o listener para o evento de resize da janela
    window.addEventListener('resize', handleResize);

    // Remove o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      {windowSize.width < 740 ? (
        <div
          className="justify-center items-center bg-fixed h-screen static"
          style={{
            backgroundImage: `url(${f250cel})`,
            backgroundAttachment: 'fixed',
          }}
        >
          <ResponsiveDrawer />
        </div>
      ) : (
        <div
          className="flex justify-center items-center bg-fixed bg-no-repeat bg-center bg-cover h-screen"
          style={{
            backgroundImage: `url(${f250})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <ResponsiveDrawer />
        </div>
      )}
    </>
  );
}

export default Profile;
