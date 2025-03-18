import React, { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Doctor from "../components/Doctor";
import { MdFilterListAlt } from "react-icons/md";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false)
  const specialistDoc = [
    "All",
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  // ---------------- Here we using useMemo hook insted of useState + useEffect , How see here
  const filterDoc = useMemo(() => {
    if (speciality === "All") {
      return doctors;
    }
    return speciality
      ? doctors.filter((doc) => doc.speciality === speciality)
      : doctors;
  }, [speciality, doctors]);

  const handleFilter = (whichSpeciality) => {
    navigate(`/doctors/${whichSpeciality}`);
  };

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">

        <button
          className={`flex flex-row items-center gap-1 py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""}`}
          onClick={() => setShowFilter(pre => !pre)}>
          <MdFilterListAlt/>Filters
        </button>

        {showFilter && <div className={`flex flex-col gap-4 text-sm text-gray-600`}>
          {specialistDoc.map((item, index) => (
            <p
              key={index}
              onClick={() => handleFilter(item)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === item ? "bg-indigo-100 text-black" : ""}`}
            >
              {item}
            </p>
          ))}
        </div>}

        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.length === 0 ? (
            <h1 className="text-gray-600 text-center">
              Not available for now.
            </h1>
          ) : (
            filterDoc.map((item, index) => (
              <Doctor
                key={index}
                doctorInfo={item}
                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Doctors;

// () => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')
//const [filterDoc, setFilterDoc] = useState([]);

// const applyFilter = () => {
//   if (speciality) {
//     setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
//   } else {
//     setFilterDoc(doctors);
//   }
// };

// useEffect(() => {
//   applyFilter();
// }, [speciality, doctors]);
