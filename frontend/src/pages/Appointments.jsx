import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import {
  generateTimeSlots,
  generateDaySlots,
  allTimeSlots,
} from "../utils/timeSlot";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotindex] = useState({ daySlot: 0, timeSlot: -1 });
  const [timeSlots, setTimeSlots] = useState([]);
  const today = new Date();

  const docInfo = useMemo(() => {
    return doctors.find((doc) => doc._id === docId);
  }, [docId, doctors]);

  useEffect(() => {
    setDocSlots(generateDaySlots());
    setTimeSlots(generateTimeSlots());
  }, []);

  const updateTimeSlots = (index, item) => {
    setSlotindex((pre) => ({ ...pre, daySlot: index }));
    if (today.getDate() === item.date) {
      setTimeSlots(generateTimeSlots());
      return;
    }
    setTimeSlots(allTimeSlots);
  };

  const handleAppointBooking = () => {
    if (slotIndex.timeSlot === -1) {
      alert("Please select a time slot before booking!");
      return;
    }
    console.log(docSlots[slotIndex.daySlot]);
    console.log(timeSlots[slotIndex.timeSlot]);
  };

  const scrollContainerRef = useRef(null);

  const handleWheelScroll = useCallback((event) => {
    event.preventDefault();
    scrollContainerRef.current?.scrollBy({
      left: event.deltaY * 1, // Adjust scrolling speed if needed
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheelScroll);

    return () => {
      container.removeEventListener("wheel", handleWheelScroll);
    };
  }, [handleWheelScroll]);

  return (
    docInfo && (
      <div>
        {/* ------------------ Doctor Details ---------------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* ---------- Doctor Info ------------ */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* ----------- Doctor About --------------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee: ₹
              <span className="text-gray-700">{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* ------------------ Booking Slots ---------------- */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>

          {/* Date Slots */}
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.map((item, index) => (
              <div
                onClick={() => updateTimeSlots(index, item)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex.daySlot === index
                    ? `bg-primary text-white`
                    : `border border-gray-200`
                }`}
                key={index}
              >
                <p>{item.day}</p>
                <p>{item.date}</p>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div ref={scrollContainerRef} className="flex items-center gap-3 w-full overflow-x-scroll m-4">
            {timeSlots.length > 0 ? (
              timeSlots.map((item, index) => (
                <p
                  onClick={() =>
                    setSlotindex((pre) => ({ ...pre, timeSlot: index }))
                  }
                  className={`text-sm font-light px-5 py-2 rounded-full border cursor-pointer whitespace-nowrap ${
                    slotIndex.timeSlot === index
                      ? `bg-primary text-white`
                      : `border border-gray-200`
                  }`}
                  key={index}
                >
                  {item}
                </p>
              ))
            ) : (
              <p className="text-sm text-red-500">No available slots for today.</p>
            )}
          </div>
          <button
            onClick={handleAppointBooking}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Book an appointment
          </button>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointments;
