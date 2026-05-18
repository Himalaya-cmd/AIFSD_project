import { useEffect, useState } from "react";

import API from "../services/api";

function Analytics() {

  const [analytics, setAnalytics] =
    useState(null);


  const fetchAnalytics = async () => {

    try {

      const res = await API.get(
        "/employees/analytics"
      );

      setAnalytics(res.data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {

    fetchAnalytics();

  }, []);


  if (!analytics) {
    return <h1>Loading...</h1>
  }


  return (

    <div className="grid md:grid-cols-3 gap-6 mb-10">

      <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-lg">

        <h2 className="text-slate-400 text-lg">
          Total Employees
        </h2>

        <p className="text-5xl font-bold mt-4 text-cyan-400">
          {analytics.totalEmployees}
        </p>

      </div>


      <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-lg">

        <h2 className="text-slate-400 text-lg">
          Average Performance
        </h2>

        <p className="text-5xl font-bold mt-4 text-green-400">
          {Math.round(
            analytics.averagePerformance
          )}
        </p>

      </div>


      <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-lg">

        <h2 className="text-slate-400 text-lg">
          Top Performer
        </h2>

        <p className="text-3xl font-bold mt-4 text-yellow-400">
          {
            analytics.topEmployees[0]?.name
          }
        </p>

      </div>

    </div>
  )
}

export default Analytics