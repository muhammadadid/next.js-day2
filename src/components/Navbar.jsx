import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setToken } from "../Redux/slice/authSlice";
import { toast } from "react-toastify";
import { fetchUserDetails } from "@/Redux/slice/userSlice";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasFetchedUser, setHasFetchedUser] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        throw new Error("No token found");
      }
      await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      localStorage.removeItem("token");
      dispatch(setToken(null)); // Clear the token in Redux state
      setIsLoggedIn(false);
      router.push("/");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out");
    }
  };

  const fetchUser = useCallback(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && (!token || token !== storedToken)) {
      dispatch(setToken(storedToken));
    }
    if (storedToken && !hasFetchedUser) {
      dispatch(fetchUserDetails(storedToken));
      setHasFetchedUser(true);
    }
  }, [dispatch, token, hasFetchedUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    setIsLoggedIn(Boolean(accessToken));
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <header className="box-border fixed top-0 left-0 flex items-center justify-between w-full max-w-full gap-20 p-2 text-xl bg-opacity-40 z-1 font-rubik ">
      <div className="flex items-center justify-center">
        <img
          className="relative w-12 h-12"
          loading="lazy"
          alt="Logo"
          src="/images/logo.png"
          width={20}
          height={20}
        />
      </div>
      <div className="relative flex items-center justify-center w-full max-w-full gap-8 mq450:hidden">
        <a href="/" className="relative font-medium no-underline text-inherit">
          Home
        </a>
        <a href="/Promo" className="relative no-underline text-inherit">
          Promo
        </a>
        <a href="/Actifity" className="relative no-underline text-inherit">
          Activity
        </a>
        {isLoggedIn && user?.role === "admin" && (
          <a
            href="/dashboard/ListUser"
            className="relative no-underline text-inherit"
          >
            Dashboard
          </a>
        )}
      </div>
      <div className="flex items-center gap-8 mq450:hidden">
        {isLoggedIn ? (
          <div className="relative">
            <p
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleProfileClick}
              aria-expanded={showDropdown ? "true" : "false"}
              aria-haspopup="true"
            >
              <img
                className="w-10 h-10 rounded-full"
                src={user?.profilePictureUrl}
                alt="Profile"
                width={20}
                height={20}
              />
              <span className="text-lg">{user?.name}</span>
            </p>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg">
                <a
                  href="/Profile"
                  className="block px-4 py-2 text-lg text-black no-underline rounded-lg hover:bg-gray-200"
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm text-left text-white bg-red-700 rounded-lg hover:bg-red-950"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="text-lg bg-transparent hover:text-gray-900">
              <a href="/Login" className="text-white no-underline text-inherit">
                Login
              </a>
            </button>
            <button className="px-8 py-2 rounded-md bg-greenyellow hover:bg-yellowgreen-200">
              <a href="/Register" className="text-black no-underline">
                Sign up
              </a>
            </button>
          </>
        )}
      </div>
      {/* Hamburger Menu Button */}
      <button
        className="block bg-opacity-0 mq450:flex mq1125:hidden mq1350:hidden mq1750:hidden mq1920:hidden"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6 text-black bg-opacity-0"
            fill="bg-opacity-0"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Dropdown Menu */}
      <nav
        className={`absolute top-full right-0 w-full bg-white rounded-lg shadow-lg max-w-full ${
          isOpen ? "block" : "hidden"
        } `}
      >
        <ul className="flex flex-col items-center justify-center no-decoration ">
          <li>
            <a
              href="/"
              className="block px-4 py-2 text-lg text-black no-underline hover:bg-gray-200"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/Promo"
              className="block px-4 py-2 text-lg text-black no-underline hover:bg-gray-200"
            >
              Promo
            </a>
          </li>
          <li>
            <a
              href="/Actifity"
              className="block px-4 py-2 text-lg text-black no-underline hover:bg-gray-200"
            >
              Activity
            </a>
          </li>
          {isLoggedIn && user?.role === "admin" && (
            <li>
              <a
                href="/dashboard/ListUser"
                className="block px-4 py-2 text-lg text-black no-underline hover:bg-gray-200"
              >
                Dashboard
              </a>
            </li>
          )}
          {isLoggedIn ? (
            <div className="relative">
              <p
                className="flex items-center cursor-pointer"
                onClick={handleProfileClick}
                aria-expanded={showDropdown ? "true" : "false"}
                aria-haspopup="true"
              >
                <img
                  className="w-20 h-20 rounded-full "
                  src={user?.profilePictureUrl}
                  alt="Profile"
                  width={40}
                  height={40}
                />
              </p>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg">
                  <a
                    href="/Profile"
                    className="block px-4 py-2 text-lg text-black no-underline rounded-lg hover:bg-gray-200"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-left text-white bg-red-700 rounded-lg hover:bg-red-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-start gap-8">
                <button className="p-2 text-lg bg-transparent border-b-2 border-l-2 rounded-2xl hover:text-gray-900">
                  <a
                    href="/Login"
                    className="text-black no-underline text-inherit"
                  >
                    Login
                  </a>
                </button>
                <button className="px-8 py-2 rounded-md bg-greenyellow hover:bg-yellowgreen-200">
                  <a href="/Register" className="text-black no-underline">
                    Sign up
                  </a>
                </button>
              </div>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
