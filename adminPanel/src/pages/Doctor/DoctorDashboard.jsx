import React from 'react'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {
  return (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white
             p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{80}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white
             p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{35}</p>
            <p className='text-gray-400'>Total Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white
             p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.pending_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>12</p>
            <p className='text-gray-400'>Pending Appointments</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard