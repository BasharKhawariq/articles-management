"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname to detect current URL
import { FaRegUser, FaUsersCog } from "react-icons/fa";
import { FiSidebar, FiLogOut } from "react-icons/fi";
import { MdArticle } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai"; // Menu icon for mobile
import Image from "next/image";

const Sidebar = () => {
  const [collapse, setCollapse] = useState(false); // Track sidebar collapse
  const [isMobile, setIsMobile] = useState(false); // Track mobile state
  const pathname = usePathname(); // Get current pathname

  // Toggle collapse state
  const toggleSidebar = () => setCollapse(!collapse);

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      const isMobileScreen = window.innerWidth < 768;
      setIsMobile(isMobileScreen); // Set mobile state based on screen width
      setCollapse(isMobileScreen); // Auto-collapse on mobile screens
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run on initial load

    // Cleanup listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Menu items
  const menus = [
    {
      icon: <FaRegUser size={20} />,
      name: "Profile",
      href: "/profile",
    },
    {
      icon: <FaUsersCog size={20} />,
      name: "Users",
      href: "/users",
    },
    {
      icon: <MdArticle size={20} />,
      name: "Article",
      href: "/articles",
    },
  ];

  return (
    <div
      className={`fixed lg:relative shadow-lg bg-slate-50 border border-r-4 text-slate-600 h-full p-6 flex flex-col justify-between transition-all duration-300 ease-in-out z-50 ${
        collapse ? "w-20" : "w-64"
      }`}
    >
      {/* Logo and Collapse Button */}
      <div className="flex items-center justify-between">
        {!collapse && (
          <Image
            src="/Artify-logo.png"
            alt="Artify Logo"
            width={45}
            height={45}
            className="transition-all duration-300"
          />
        )}

        {/* Toggle button - show hamburger icon on mobile */}
        <button
          onClick={toggleSidebar}
          className={`lg:flex items-center p-2 rounded-md transition-all hover:bg-slate-200/35 hover:border-l-2 ${
            collapse ? "justify-center" : "pl-4"
          }`}
        >
          {isMobile ? (
            <AiOutlineMenu size={24} />
          ) : (
            <FiSidebar size={20} />
          )}
        </button>
      </div>

      {/* Menu items */}
      <div className="mt-8 flex flex-col gap-4">
        {menus.map((menu) => (
          <Link key={menu.name} href={menu.href} passHref>
            <div
              className={`flex items-center p-2 rounded-md transition-all hover:bg-slate-200/35 hover:border-l-2 ${
                collapse ? "justify-center" : "pl-4"
              } ${
                pathname === menu.href
                  ? "bg-slate-200/35 border-l-2 border-white text-[#0a64ff]" // Active menu style
                  : ""
              }`}
            >
              {menu.icon}
              {!collapse && (
                <span
                  className={`ml-4 ${
                    pathname === menu.href
                      ? "font-bold bg-gradient-to-b from-[#0BA5EC] to-[#3D5ED1] inline-block text-transparent bg-clip-text" // Active menu style
                      : "font-medium text-slate"
                  }`}
                >
                  {menu.name}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Logout button */}
      <div className="mt-8 flex items-center justify-center lg:justify-start">
        <button
          onClick={toggleSidebar}
          className={`flex items-center p-2 rounded-md transition-all hover:bg-white/10 hover:border-l-2 ${
            collapse ? "justify-center" : "pl-4"
          }`}
        >
          <FiLogOut size={20} />
          {!collapse && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
