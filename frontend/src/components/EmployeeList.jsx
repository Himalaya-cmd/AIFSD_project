import { useState } from "react";

import API from "../services/api";

function EmployeeList({

  employees,

  allEmployees,

  setFilteredEmployees,

  fetchEmployees,

}) {

  const [search, setSearch] =
    useState("");


  // DELETE EMPLOYEE
  const deleteEmployee = async (id) => {

    try {

      await API.delete(
        `/employees/${id}`
      );

      alert("Employee Deleted");

      fetchEmployees();

    } catch (error) {

      console.log(error);
    }
  };


  // SEARCH EMPLOYEE
  const searchEmployee = () => {

    if (search === "") {

      setFilteredEmployees(
        allEmployees
      );

      return;
    }


    const filtered = allEmployees.filter(
      (emp) =>
        emp.department === search
    );

    setFilteredEmployees(filtered);
  };


  return (

    <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-lg mb-10">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

        <h2 className="text-3xl font-bold text-cyan-400">
          Employee List
        </h2>


        <div className="flex gap-2">

          <select
            className="bg-slate-800 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          >

            <option value="">
              All Departments
            </option>

            <option value="Development">
              Development
            </option>

            <option value="AI">
              AI
            </option>

            <option value="HR">
              HR
            </option>

            <option value="Marketing">
              Marketing
            </option>

          </select>


          <button
            onClick={searchEmployee}
            className="bg-cyan-500 hover:bg-cyan-600 transition text-black font-bold px-5 rounded-xl"
          >
            Search
          </button>

        </div>

      </div>


      <div className="grid md:grid-cols-2 gap-5">

        {employees.map((emp) => (

          <div
            key={emp._id}
            className="bg-slate-800 border border-slate-700 p-6 rounded-2xl"
          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="text-2xl font-bold text-white">
                  {emp.name}
                </h3>

                <p className="text-slate-400 mt-1">
                  {emp.email}
                </p>

              </div>


              <span className="bg-cyan-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                {emp.department}
              </span>

            </div>


            <div className="mt-5 space-y-2">

              <p>
                <span className="text-cyan-400 font-semibold">
                  Skills:
                </span>

                {" "}

                {emp.skills.join(", ")}
              </p>


              <p>
                <span className="text-green-400 font-semibold">
                  Performance:
                </span>

                {" "}

                {emp.performanceScore}
              </p>


              <p>
                <span className="text-yellow-400 font-semibold">
                  Experience:
                </span>

                {" "}

                {emp.experience} years
              </p>

            </div>


            <button
              onClick={() =>
                deleteEmployee(emp._id)
              }
              className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-xl mt-5"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default EmployeeList