import React from 'react';
import { CircleLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-pallete flex justify-center items-center text-5xl text-pallete">
      <CircleLoader color="#a3c6c4" />
    </div>
  );
};

export default Loader;
