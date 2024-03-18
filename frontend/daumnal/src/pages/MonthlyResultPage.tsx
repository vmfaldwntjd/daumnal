import React from 'react';
import { useLocation } from 'react-router';

const MonthlyResultPage = () => {

  const location = useLocation();
  const { year, month } = location.state || {};

  return (
    <div className='h-screen w-full p-12'>
    <div className=' w-full h-full bg-white rounded-xl shadow-lg'>
     <div>
     </div>
    </div>
    </div>
  )
}

export default MonthlyResultPage;