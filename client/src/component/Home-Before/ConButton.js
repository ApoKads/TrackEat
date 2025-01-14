import React from 'react';
import { Link } from 'react-router-dom';


function ConButton() {
  return (
    <div className="Landing">
      <Link to="/register" className='w-full flex items-center justify-center'>
        <button className="w-48 py-3 bg-ourLime rounded-2xl font-bold text-slate-50 shadow-sm-light shadow-gray-700 hover:scale-110 duration-300 ease-in-out hover:brightness-95">Continue</button>
      </Link>
    </div>
  );
}

export default ConButton;
