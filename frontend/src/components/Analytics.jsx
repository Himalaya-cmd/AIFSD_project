function Analytics({ employees = [] }) {
  const totalEmployees = employees.length;

  const averagePerformance =
    totalEmployees === 0
      ? 0
      : employees.reduce(
          (sum, emp) =>
            sum + Number(emp.performanceScore || 0),
          0
        ) / totalEmployees;

  const topEmployees = [...employees]
    .sort(
      (a, b) =>
        Number(b.performanceScore || 0) -
        Number(a.performanceScore || 0)
    )
    .slice(0, 5);

  const departmentCounts = employees.reduce(
    (counts, emp) => {
      const department =
        emp.department || "Unassigned";

      counts[department] =
        (counts[department] || 0) + 1;

      return counts;
    },
    {}
  );

  const departmentData = Object.entries(
    departmentCounts
  );

  const maxDepartmentCount =
    Math.max(
      1,
      ...departmentData.map(
        ([, count]) => count
      )
    );

  const departmentColors = [
    "bg-cyan-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-pink-400",
    "bg-indigo-400",
  ];


  return (

    <div className="mb-10">

      <div className="grid md:grid-cols-3 gap-6 mb-6">

      <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-lg">

        <h2 className="text-slate-400 text-lg">
          Total Employees
        </h2>

        <p className="text-5xl font-bold mt-4 text-cyan-400">
          {totalEmployees}
        </p>

      </div>


      <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-lg">

        <h2 className="text-slate-400 text-lg">
          Average Performance
        </h2>

        <p className="text-5xl font-bold mt-4 text-green-400">
          {Math.round(
            averagePerformance
          )}
        </p>

      </div>


      <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-lg">

        <h2 className="text-slate-400 text-lg">
          Top Performer
        </h2>

        <p className="text-3xl font-bold mt-4 text-yellow-400">
          {
            topEmployees[0]?.name || "N/A"
          }
        </p>

      </div>

      </div>


      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-lg">

          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            Department Bar Graph
          </h2>

          <div className="h-72 flex items-end gap-4 border-l border-b border-slate-700 px-4 pt-4">

            {departmentData.length === 0 && (
              <p className="text-slate-400 self-center mx-auto">
                No employee data available.
              </p>
            )}

            {departmentData.map(
              ([department, count], index) => {
                const height =
                  (count / maxDepartmentCount) *
                  100;

                return (
                  <div
                    key={department}
                    className="flex-1 h-full flex flex-col justify-end items-center min-w-0"
                  >

                    <span className="text-cyan-300 font-bold mb-2">
                      {count}
                    </span>

                    <div
                      className={`w-full max-w-20 rounded-t-xl ${
                        departmentColors[
                          index %
                            departmentColors.length
                        ]
                      }`}
                      style={{
                        height: `${height}%`,
                        minHeight: "18px",
                      }}
                    />

                    <span className="text-slate-300 text-xs text-center mt-3 truncate w-full">
                      {department}
                    </span>

                  </div>
                );
              }
            )}

          </div>

        </div>


        <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-lg">

          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            Performance Bar Graph
          </h2>

          <div className="h-72 flex items-end gap-4 border-l border-b border-slate-700 px-4 pt-4">

            {topEmployees.length === 0 && (
              <p className="text-slate-400 self-center mx-auto">
                No performance data available.
              </p>
            )}

            {topEmployees.map((emp) => {
              const score = Math.min(
                100,
                Number(emp.performanceScore || 0)
              );

              return (
                <div
                  key={emp._id}
                  className="flex-1 h-full flex flex-col justify-end items-center min-w-0"
                >

                  <span className="text-green-300 font-bold mb-2">
                    {score}
                  </span>

                  <div
                    className="w-full max-w-20 bg-green-400 rounded-t-xl"
                    style={{
                      height: `${score}%`,
                      minHeight: "18px",
                    }}
                  />

                  <span className="text-slate-300 text-xs text-center mt-3 truncate w-full">
                    {emp.name}
                  </span>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  )
}

export default Analytics
