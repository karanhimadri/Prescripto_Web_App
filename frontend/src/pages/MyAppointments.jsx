import React, { useContext, useEffect, useState } from "react";
import { assets, doctors } from "../assets/assets";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { apiContext } from "../api/ApiContextProvider";
import { toast } from 'react-toastify';
import { AppContext } from "../context/AppContext";


const MyAppointments = () => {

  const { createPaymentOrder, verifyPayment } = useContext(apiContext)
  const { user } = useContext(AppContext)

  const [loadingIndex, setLoadingIndex] = useState(null);

  // Load Razorpay script when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (fees, index) => {
    setLoadingIndex(index)
    try {
      const res = await createPaymentOrder(fees)
      
      if (!res.status) {
        toast.error("Payment processing was failed.")
      }
      const { order_id, amount, currency } = res;

      const options = {
        key: "rzp_test_QqorfzSJrg2ZfN", // Your Razorpay Test Key
        amount: amount,
        currency: currency,
        name: "Prescripto",
        description: "Doctor Appointment Fee",
        order_id: order_id,
        handler: async function (response) {
          console.log("Payment successful:", response);
          // send payment response to backend for verification
          const result = await verifyPayment(response)
          if (!result.success) {
            toast.error(result.message)
            return
          }
          toast.success(result.message)
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        theme: {
          color: "#2563eb",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

      setLoadingIndex(null)
    } catch (error) {
      toast.error(error.message)
    }
  }



  return <div>
    <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
    <div>
      {doctors.slice(0, 4).map((item, index) => (
        <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
          <div>
            <img className="w-32 bg-indigo-100" src={item.image} alt="" />
          </div>
          <div className="flex-1 text-sm text-zinc-600">
            <p className="text-neutral-800 font-semibold">{item.name}</p>
            <p>{item.speciality}</p>
            <p className="text-zinc-700 font-medium mt-1">Address: </p>
            <p className="text-xs">{item.address.line1}</p>
            <p className="text-xs">{item.address.line2}</p>
            <p className="text-xs mt-1"><span className="text-sm text-neutral-700 font-medium">Date & Time: </span> 25, July 2025 | 08:30 PM</p>
          </div>
          <div></div>
          <div className="flex flex-col gap-2 justify-end">
            <button
              className="text-sm text-center sm:min-w-48 py-2 border rounded bg-primary text-white hover:bg-blue-600 transition-all duration-300"
              onClick={() => handlePayment(item.fees, index)}
            >
              {loadingIndex === index ? (<div className="flex items-center justify-center">
                <AiOutlineLoading3Quarters size={15} className="animate-spin text-white text-4xl" />
              </div>) : "Pay Online"}
            </button>
            <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">Cancel appointment</button>
          </div>
        </div>
      ))}
    </div>
  </div>;
};

export default MyAppointments;
