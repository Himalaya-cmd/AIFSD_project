import { useState } from "react";

import API from "../services/api";
import SearchBar from "./SearchBar";

function EmployeeList({

  employees,

  fetchEmployees,

}) {

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      name: "",
      email: "",
      department: "",
      skills: "",
      performanceScore: "",
      experience: "",
    });

  const departments = [
    {
      value: "",
      label: "All Departments",
    },
    {
      value: "Development",
      label: "Development",
    },
    {
      value: "AI",
      label: "AI",
    },
    {
      value: "HR",
      label: "HR",
    },
    {
      value: "Marketing",
      label: "Marketing",
    },
  ];


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


  const startEdit = (employee) => {
    setEditingId(employee._id);

    setEditData({
      name: employee.name || "",
      email: employee.email || "",
      department: employee.department || "",
      skills: Array.isArray(employee.skills)
        ? employee.skills.join(", ")
        : "",
      performanceScore:
        employee.performanceScore || "",
      experience: employee.experience || "",
    });
  };


  const cancelEdit = () => {
    setEditingId(null);

    setEditData({
      name: "",
      email: "",
      department: "",
      skills: "",
      performanceScore: "",
      experience: "",
    });
  };


  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };


  const updateEmployee = async (id) => {
    try {
      const employeeData = {
        ...editData,

        skills: editData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),

        performanceScore:
          Number(editData.performanceScore),

        experience: Number(
          editData.experience
        ),
      };

      await API.put(
        `/employees/${id}`,
        employeeData
      );

      alert("Employee Updated");

      cancelEdit();

      fetchEmployees();

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Unable to update employee"
      );
    }
  };

  const filteredEmployees = search
    ? employees.filter(
        (emp) => emp.department === search
      )
    : employees;


  return (

    <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-lg mb-10">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

        <h2 className="text-3xl font-bold text-cyan-400">
          Employee List
        </h2>


        <SearchBar
          value={search}
          onChange={setSearch}
          options={departments}
        />

      </div>


      <div className="grid md:grid-cols-2 gap-5">

        {filteredEmployees.map((emp) => (

          <div
            key={emp._id}
            className="bg-slate-800 border border-slate-700 p-6 rounded-2xl"
          >

            {editingId === emp._id ? (

              <div>

                <div className="grid gap-3">

                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    placeholder="Name"
                    className="bg-slate-900 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
                    onChange={handleEditChange}
                  />

                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    placeholder="Email"
                    className="bg-slate-900 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
                    onChange={handleEditChange}
                  />

                  <select
                    name="department"
                    value={editData.department}
                    onChange={handleEditChange}
                    className="bg-slate-900 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
                  >

                    <option value="">
                      Select Department
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

                  <input
                    type="text"
                    name="skills"
                    value={editData.skills}
                    placeholder="Skills comma separated"
                    className="bg-slate-900 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
                    onChange={handleEditChange}
                  />

                  <input
                    type="number"
                    name="performanceScore"
                    value={editData.performanceScore}
                    placeholder="Performance Score"
                    className="bg-slate-900 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
                    onChange={handleEditChange}
                  />

                  <input
                    type="number"
                    name="experience"
                    value={editData.experience}
                    placeholder="Experience"
                    className="bg-slate-900 border border-slate-700 p-3 rounded-xl outline-none focus:border-cyan-400"
                    onChange={handleEditChange}
                  />

                </div>


                <div className="flex gap-3 mt-5">

                  <button
                    type="button"
                    onClick={() =>
                      updateEmployee(emp._id)
                    }
                    className="bg-green-500 hover:bg-green-600 transition text-black font-bold px-5 py-2 rounded-xl"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-slate-700 hover:bg-slate-600 transition text-white px-5 py-2 rounded-xl"
                  >
                    Cancel
                  </button>

                </div>

              </div>

            ) : (

              <>

                <div className="flex justify-between items-start gap-4">

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


                <div className="flex gap-3 mt-5">

                  <button
                    type="button"
                    onClick={() => startEdit(emp)}
                    className="bg-yellow-400 hover:bg-yellow-500 transition text-black font-bold px-5 py-2 rounded-xl"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteEmployee(emp._id)
                    }
                    className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-xl"
                  >
                    Delete
                  </button>

                </div>

              </>

            )}

          </div>

        ))}

      </div>

    </div>
  )
}

export default EmployeeList
