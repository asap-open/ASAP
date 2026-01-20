import React from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import HeroBackground from "../components/ui/HeroBackground";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (  
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden font-display">
      {/* Full Screen Background Wrapper */}
      <div className="absolute inset-0 w-full h-full">
        <HeroBackground />
      </div>

      {/* Main Container - Split View on Desktop */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row h-screen md:h-auto md:min-h-[600px] md:max-h-[800px] md:rounded-3xl md:overflow-hidden md:shadow-2xl">
        {/* Left Side (Desktop): Branding / Image Area */}
        {/* On Mobile: Top part of screen */}
        <div className="flex-none basis-[35%] lg:basis-[40%] flex flex-col items-center pt-12 md:justify-center md:pt-0 md:bg-gradient-to-br md:from-white/60 md:to-white/30 md:backdrop-blur-xl md:border-r md:border-white/40">
          {/* Logo Circle */}

          <img
            src="/logo.webp"
            alt="FitTrack Logo"
            className="w-16 h-16 md:w-16 md:h-16"
          />

          {/* Brand Text */}
          <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em] md:text-slate-900 md:text-4xl">
            FitTrack
          </h2>

          {/* Desktop Slogan (Hidden on Mobile) */}
          <p className="text-white/80 md:text-slate-700 text-lg mt-4 text-center hidden md:block max-w-xs font-medium">
            Welcome back! Ready to push your limits again?
          </p>

          {/* Mobile: Welcome Text (In Upper Section) */}
          <div className="md:hidden mt-6 px-6 text-center">
            <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight">
              Welcome Back
            </h1>
            <p className="text-white/80 text-base font-normal leading-normal pt-2">
              Enter your details to continue your fitness journey
            </p>
          </div>
        </div>

        {/* Right Side: Login Form Panel */}
        {/* On Mobile: Bottom Sheet Card. On Desktop: Right Panel */}
        <div className="flex-1 flex flex-col bg-background md:bg-white w-full h-full md:h-auto rounded-t-[40px] md:rounded-none px-6 pt-10 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-none mt-8 md:mt-0 overflow-y-auto md:justify-center">
          {/* Desktop Header */}
          <div className="hidden md:block mb-8 w-full max-w-md mx-auto">
            <h1 className="text-slate-900 text-3xl font-bold">Log In</h1>
            <p className="text-text-muted mt-2">
              Enter your details to continue
            </p>
          </div>

          <form className="space-y-6 max-w-md mx-auto w-full">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="flex flex-col w-full">
                <span className="text-text-main text-sm font-medium leading-normal pb-1 pl-1">
                  Email Address
                </span>
                <input
                  className="w-full rounded-xl text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 bg-white h-14 placeholder:text-text-muted/60 p-[15px] text-base font-normal transition-all"
                  placeholder="name@example.com"
                  type="email"
                />
              </label>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="flex flex-col w-full relative">
                <span className="text-text-main text-sm font-medium leading-normal pb-1 pl-1">
                  Password
                </span>
                <div className="relative">
                  <input
                    className="w-full rounded-xl text-text-main focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 bg-white h-14 placeholder:text-text-muted/60 p-[15px] pr-12 text-base font-normal transition-all"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </label>
              <div className="flex justify-end px-1">
                <a className="text-text-main text-sm font-medium hover:underline hover:text-primary transition-colors cursor-pointer">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold text-lg h-14 rounded-xl shadow-md shadow-primary/30 active:scale-[0.98] transition-all cursor-pointer">
                Login
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="py-4 text-center">
              <p className="text-text-muted text-base">
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-text-main font-bold hover:underline hover:text-primary ml-1 transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
