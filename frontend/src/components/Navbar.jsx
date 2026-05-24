import { Link } from "react-router-dom";

function Navbar({
  title = "Employee AI Dashboard",
  subtitle = "AI Powered Employee Analytics System",
  onLogout,
}) {
  return (
    <nav className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-10">
      <div>
        <Link
          to="/dashboard"
          className="text-4xl md:text-5xl font-bold tracking-wide text-white hover:text-cyan-300 transition"
        >
          {title}
        </Link>

        {subtitle && (
          <p className="text-slate-400 mt-2">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/dashboard"
          className="border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 transition px-5 py-2 rounded-xl font-semibold"
        >
          Dashboard
        </Link>

        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl font-semibold"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
