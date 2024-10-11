"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { FaRegUser, FaUsersCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Mock data for profile (replace with actual fetching logic)
const profileData = {
  employee_name: "John Doe",
  role_name: "Admin",
  email: "john.doe@example.com",
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const dropdownRef = useRef(null); // Ref to track dropdown clicks

  // Get the current path using `usePathname`
  const pathname = usePathname();

  // Function to map path to header name and icon
  const { headerName, headerIcon } = useMemo(() => {
    if (pathname === "/") {
      return { headerName: "Dashboard", headerIcon: null };
    } else if (pathname.includes("/profile")) {
      return { headerName: "Profile", headerIcon: <FaRegUser /> };
    } else if (pathname.includes("/users")) {
      return { headerName: "Users", headerIcon: <FaUsersCog /> };
    } else if (pathname.includes("/articles")) {
      return { headerName: "Articles", headerIcon: <MdArticle /> };
    }
    return { headerName: "", headerIcon: null };
  }, [pathname]);

  // Function to toggle profile dropdown
  const toggleDropdown = () => {
    setOpen(!open);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false); // Close the dropdown when clicking outside
      }
    };
    if (open) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => window.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <div className="w-full bg-slate-50 shadow-sm flex items-center justify-between p-4 py-5">
      {/* Logo & Header Name */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-3 rounded-lg flex text-blue-700">
          {headerIcon && <span className="text-xl">{headerIcon}</span>}
        </div>
        <span className="font-semibold text-slate-800">{headerName}</span>
      </div>

      {/* Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">
              {profileData.employee_name}
            </span>
            <span className="text-xs text-gray-500">
              {profileData.role_name}
            </span>
          </div>
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg ring-1 ring-black/5 w-56 z-40">
            <div className="p-3 flex flex-col">
              <span className="font-semibold">{profileData.employee_name}</span>
              <span className="text-xs text-blue-700">
                {profileData.role_name}
              </span>
              <span className="text-xs text-gray-800">{profileData.email}</span>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col gap-2">
              <Link href="/profile">
                <button className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md">
                  <FaUser href="/profile" className="text-gray-500" /> My
                  Profile
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md w-full text-left">
                  <FaSignOutAlt className="text-gray-500" /> Logout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Logout modal (or separate component) */}
      {isOpenLogout && <div>Logout confirmation or modal here</div>}
    </div>
  );
};

export default Header;
