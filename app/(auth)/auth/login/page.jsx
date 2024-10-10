"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useAuth from "@/stores/useAuth"; // Zustand store for Auth
import { Input } from "@/components/ui/input";
import useLayoutStore from "@/stores/useLayoutStore"; // Zustand store for global layout (loading, notifications)
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth(); // Access Zustand's login function
  const { setLoading, setNotification } = useLayoutStore(); // Access Zustand's global layout state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start showing the spinner
    try {
      // Attempt login
      const result = await login(username, password);
      if (result.success) {
        // Show success notification and redirect to profile
        // setNotification({
        //   show: true,
        //   type: "success",
        //   title: "Success",
        //   message: "You have successfully logged in!",
        //   redirectTo: "/profile",
        // });
        router.push("/profile");
      } else {
        // Show error notification if login fails
        setNotification({
          show: true,
          type: "error",
          title: "Login Failed",
          message:
            result.response?.data?.detail ||
            "Invalid credentials, please try again.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      // Handle any network or server errors
      setNotification({
        show: true,
        type: "error",
        title: "Network Error",
        message: "Something went wrong, please try again later.",
      });
    } finally {
      setLoading(false); // Stop showing the spinner
    }
  };

  return (
    <div className="h-screen w-screen">
      <div className="relative flex flex-col bg-slate-50 gap-8 justify-center items-center min-h-screen p-4 sm:p-0">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/Artify.png"
            alt="Artify Logo"
            width={200}
            height={500}
          />
        </div>
        <div className="w-full max-w-md p-6 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Sign In to your account
            </h2>
            <h6 className="text-sm text-center text-gray-900">
              Welcome back to artify app!
            </h6>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div className="mb-4 flex flex-col gap-2">
                <Input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email"
                  label="Email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div className="mb-4 flex flex-col gap-2 relative">
                <Input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {/* Toggle Button for Show/Hide Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-12 right-0 pr-3 flex items-center text-sm leading-5 z-20"
                >
                  {showPassword ? (
                    <FaEye
                      className="h-5 w-5 text-gray-500/70"
                      aria-hidden="true"
                    />
                  ) : (
                    <FaEyeSlash
                      className="h-5 w-5 text-gray-500/70"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
