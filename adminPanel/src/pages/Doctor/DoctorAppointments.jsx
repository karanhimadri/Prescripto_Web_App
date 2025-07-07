import React from 'react'
import calculateAgeFromDateOfBirth from '../../utils/CalculateAgeFromDOB'
import slotDateFormat from '../../utils/SlotDateFormatter'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const data = [{
    id: 1,
    userImage: "/images/profile_pic.png"
  }]


  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh]'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          data.map((item, index) => (
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userImage} alt="" />
              </div>
              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full bg-blue-50'>Online</p>
              </div>
              <p className='max-sm:hidden'>{calculateAgeFromDateOfBirth("2005-01-08")}</p>
              <p>{slotDateFormat("2025-06-25")}, 11:30 AM</p>
              <p>₹250</p>
              <div className='flex'>
                <img className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                <img className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointments