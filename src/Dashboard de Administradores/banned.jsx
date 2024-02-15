import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Banned = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">You are banned!</h1>
      <p className="text-lg text-gray-800 mb-2">Unfortunately, you are banned from accessing this site.</p>
      <p className="text-lg text-gray-800 mb-4">If you believe this is a mistake or would like to appeal, please contact support.</p>
      <button 
        className="px-6 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition duration-300 ease-in-out"
        onClick={handleLogout}
      >
        Logout
      </button>
     
    </div>
  );
};

export default Banned;
