import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { apiContext } from "../api/ApiContextProvider";

const Navbar = () => {
  const { trackLoggrdIn } = useContext(AppContext)
  const { logout } = useContext(apiContext)

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  function Logout() {
    logout();
    navigate("/")
  }

  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md flex items-center justify-between text-sm py-4 px-6 border-b border-gray-400">
        <img onClick={() => navigate("/")} src={assets.logo} alt="" className="w-44 cursor-pointer" />
        <ul className="hidden md:flex items-start gap-5 font-medium">
          <NavLink to="/" className="hover:text-primary">
            <li className="py-1">HOME</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/doctors" className="hover:text-primary">
            <li className="py-1">ALL DOCTORS</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/about" className="hover:text-primary">
            <li className="py-1">ABOUT</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/contact" className="hover:text-primary">
            <li className="py-1">CONTACT</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
        </ul>
        <div className="flex items-center gap-4">
          {trackLoggrdIn ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">My profile</p>
                  <p onClick={() => navigate("/my-appointments")} className="hover:text-black cursor-pointer">My Appointments</p>
                  <p onClick={() => Logout()} className="hover:text-red-700 cursor-pointer">Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { navigate("/login"); window.scrollTo(0, 0) }}
              className="bg-primary text-white px-8 py-3 rounded-full font-medium hidden md:block"
            >
              Create Account
            </button>
          )}
          <img onClick={() => setShowMenu(true)} className="w-6 cursor-pointer md:hidden" src={assets.menu_icon} alt="" />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${showMenu ? 'fixed w-full h-screen bg-white z-50' : "hidden"} md:hidden right-0 top-0 bottom-0 transition-all`}>
        <div className="flex items-center justify-between px-5 py-6">
          <img className="w-36" src={assets.logo} alt="" />
          <img className="w-7 cursor-pointer" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
        </div>
        <ul className="flex flex-col items-center gap-4 mt-5 text-lg font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/"><p className="px-32 py-2 rounded inline-block">HOME</p></NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors"><p className="px-28 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about"><p className="px-32 py-2 rounded inline-block">ABOUT</p></NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact"><p className="px-32 py-2 rounded inline-block">CONTACT</p></NavLink>
        </ul>
      </div>

      {/* Add padding to the body to prevent content from being hidden under the fixed navbar */}
      <div className="mt-20 p-4">
      </div>
    </>
  );
};

export default Navbar;
