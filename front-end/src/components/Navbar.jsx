
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-800 to-pink-600  text-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">MyApp</Link>

      <div className="flex gap-6 items-center text-md">
        {token ? (
          <>
            <Link to="/dashboard" className=" text-lg  color-white hover:text-grey-100  ">
              Dashboard
            </Link>
            <Link to="/tasks" className=" text-lg hover:text-grey-100   ">
              Tasks
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-800 px-3 py-1 rounded text-lg text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200">Login</Link>
            <Link to="/register" className="hover:text-gray-200">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
