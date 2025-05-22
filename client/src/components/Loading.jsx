import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

const Loading = () => {
  const { navigate } = useAppContext();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get('next');

  useEffect(() => {
    if (nextUrl) {
      const timer = setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 3000); // Reduced wait for faster UX

      return () => clearTimeout(timer); // Cleanup
    }
  }, [nextUrl, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white text-gray-700">
      <div
        className="animate-spin rounded-full h-20 w-20 border-4 border-gray-300 border-t-primary"
        role="status"
        aria-label="Loading"
      ></div>
      <p className="mt-6 text-sm font-medium tracking-wide">
        Redirecting to the next page...
      </p>
    </div>
  );
};

export default Loading;
