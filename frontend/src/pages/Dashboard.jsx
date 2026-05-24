import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import Analytics from "../components/Analytics";
import AIRecommendation from "../components/AIRecommendation";
import Navbar from "../components/Navbar";

const getEmployees = async () => {
  const res = await API.get(
    "/employees"
  );

  return res.data;
};

function Dashboard() {

  const navigate = useNavigate();

  const [employees, setEmployees] =
    useState([]);


  // FETCH EMPLOYEES
  const fetchEmployees = async () => {

    try {

      const data = await getEmployees();

      setEmployees(data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    let isMounted = true;

    const loadEmployees = async () => {
      try {
        const data = await getEmployees();

        if (isMounted) {
          setEmployees(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadEmployees();

    return () => {
      isMounted = false;
    };

  }, []);


  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-8">

      <Navbar onLogout={logout} />


      <Analytics employees={employees} />

      <EmployeeForm fetchEmployees={fetchEmployees} />

      <EmployeeList
        employees={employees}
        fetchEmployees={fetchEmployees}
      />

      <AIRecommendation />

    </div>
  )
}

export default Dashboard
