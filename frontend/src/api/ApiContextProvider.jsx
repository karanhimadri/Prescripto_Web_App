import { createContext } from "react";
import axiosInstance from "./axiosConfig";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const apiContext = createContext();

const ApiContextProvider = ({ children }) => {

  const { handleUserData, setTrackLoggrdIn, setDoctorsData } = useContext(AppContext)

  const [loading, setLoading] = useState({
    createAccountForPatient: false,
    addOrUpdatePatientInfo: false,
  });

  const createAccountForPatient = async (formData) => {
    setLoading(prev => ({ ...prev, createAccountForPatient: true }));

    try {
      const response = await axiosInstance.post("/patient/create-account", formData);
      setLoading(prev => ({ ...prev, createAccountForPatient: false }));

      const data = response.data;

      if (data.status) {
        setTrackLoggrdIn(true)
        localStorage.setItem("role", "PATIENT");
        localStorage.setItem("pToken", data.token);

        const userData = {
          name: formData.name,
          email: formData.email
        }
        handleUserData(userData)
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      setLoading(prev => ({ ...prev, createAccountForPatient: false }));
      return { success: false, message: error.message };
    }
  };

  const logIn = async (loginData) => {
    setLoading(prev => ({ ...prev, createAccountForPatient: true }));
    try {
      const response = await axiosInstance.post("/patient/login", loginData)
      setLoading(prev => ({ ...prev, createAccountForPatient: false }));

      const data = response.data;
      if (data.status) {
        setTrackLoggrdIn(true)
        localStorage.setItem("role", "PATIENT");
        localStorage.setItem("pToken", data.token);

        const userData = {
          name: data.name,
          email: data.email
        }
        handleUserData(userData)
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }

    } catch (error) {
      setLoading(prev => ({ ...prev, createAccountForPatient: false }));
      return { success: false, message: error.message };
    }
  }

  const addOrUpdatePatientInfo = async (userData) => {
    setLoading(prev => ({ ...prev, addOrUpdatePatientInfo: true }));

    try {
      const response = await axiosInstance.post("/patient/add-or-update", userData)
      setLoading(prev => ({ ...prev, addOrUpdatePatientInfo: false }));

      const data = response.data;
      if (data.status) {
        return { success: true, message: data.message }
      } else {
        return { success: false, message: data.message }
      }

    } catch (error) {
      setLoading(prev => ({ ...prev, addOrUpdatePatientInfo: false }));
      return { success: false, message: error.message };
    }
  }

  const getPatientInfo = async () => {
    try {
      const response = await axiosInstance.get("/patient/me")
      const data = response.data;
      setTrackLoggrdIn(true)
      handleUserData(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const uploadPatientImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file)

    try {
      const response = await axiosInstance.post("/patient/upload-patient-image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const data = response.data;
      return { success: true, message: data.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  const logout = () => {
    localStorage.clear();
    setTrackLoggrdIn(false)
  }

  const createPaymentOrder = async (amount) => {
    try {
      const response = await axiosInstance.post("http://localhost:8080/api/payment/create-order", {
        amount, // in rupees
      });
      const data = response.data;
      if (data) {
        return { status: true, order_id: data.id, amount: data.amount, currency: data.currency }
      } else {
        return { status: false, message: "Payment creation failed." }
      }
    } catch (error) {
      return { status: false, message: error.message }
    }
  }

  const verifyPayment = async (responseData) => {
    const response = await axiosInstance.post("http://localhost:8080/api/payment/verify", responseData)
    const data = response.data;

    if (data.status) {
      return { success: true, message: data.message }
    } else {
      return { success: false, message: data.message }
    }
  }

  const fetchAllDoctorsDetails = async () => {
    try {
      const response = await axiosInstance.get("/v1/all-doctors");
      setDoctorsData(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const values = {
    loading,
    logout,
    createAccountForPatient,
    logIn,
    addOrUpdatePatientInfo,
    getPatientInfo,
    uploadPatientImage,
    createPaymentOrder,
    verifyPayment,
    fetchAllDoctorsDetails
  }

  return <apiContext.Provider value={values}>
    {children}
  </apiContext.Provider>
}

export default ApiContextProvider;