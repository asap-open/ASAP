import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import HeroBackground from "../components/ui/HeroBackground";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden font-display">
      {/* Full Screen Background Wrapper */}
      <div className="absolute inset-0 w-full h-full">
        <HeroBackground />
      </div>

      {/* Main Container - Split View on Desktop */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row h-screen md:h-auto md:min-h-[700px] md:max-h-[850px] md:rounded-3xl md:overflow-hidden md:shadow-2xl">
        {/* Left Side (Desktop): Branding / Image Area */}
        <div className="hidden md:flex flex-none basis-[35%] lg:basis-[40%] flex-col items-center justify-center bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border-r border-white/40 p-8 text-center">
          {/* Removed inner card wrapper for cleaner look on the blurred background */}
          <div className="flex flex-col items-center max-w-xs">
            <img
              src="/logo.webp"
              alt="FitTrack Logo"
              className="w-16 h-16 md:w-16 md:h-16"
            />
            <h2 className="text-slate-900 text-3xl font-bold mb-2">
              Join FitTrack
            </h2>
            <p className="text-slate-700 text-lg font-medium">
              Start your transformation today. Track every rep, every set, and
              break your limits.
            </p>
          </div>
        </div>

        {/* Right Side: Signup Form Panel (Glassmorphism Style) */}
        <div className="relative flex-1 flex flex-col w-full h-full md:bg-white/90 md:backdrop-blur-xl bg-white/85 backdrop-blur-md overflow-y-auto">
          {/* Back Button */}
          <div className="flex items-center p-6 pb-2 justify-start">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-slate-900 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Header */}
          <div className="px-6 pt-2 pb-6 md:px-12 md:pt-4">
            <h1 className="text-slate-900 text-[34px] font-bold leading-tight tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-600 text-base font-normal mt-2">
              Join the community and start your journey.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4 px-6 md:px-12 mt-2">
            {/* Full Name */}
            <div>
              <label className="flex flex-col w-full">
                <p className="text-slate-800 text-sm font-semibold mb-2 ml-1">
                  Full Name
                </p>
                <div className="relative flex items-center">
                  <User className="absolute left-4 text-slate-500 w-5 h-5 pointer-events-none" />
                  <input
                    className="w-full rounded-xl border-none bg-white h-14 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base font-normal shadow-sm"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
              </label>
            </div>

            {/* Email Address */}
            <div>
              <label className="flex flex-col w-full">
                <p className="text-slate-800 text-sm font-semibold mb-2 ml-1">
                  Email Address
                </p>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-slate-500 w-5 h-5 pointer-events-none" />
                  <input
                    className="w-full rounded-xl border-none bg-white h-14 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base font-normal shadow-sm"
                    placeholder="name@example.com"
                    type="email"
                  />
                </div>
              </label>
            </div>

            {/* Password */}
            <div>
              <label className="flex flex-col w-full">
                <p className="text-slate-800 text-sm font-semibold mb-2 ml-1">
                  Password
                </p>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 text-slate-500 w-5 h-5 pointer-events-none" />
                  <input
                    className="w-full rounded-xl border-none bg-white h-14 pl-12 pr-12 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base font-normal shadow-sm"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </label>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="flex flex-col w-full">
                <p className="text-slate-800 text-sm font-semibold mb-2 ml-1">
                  Confirm Password
                </p>
                <div className="relative flex items-center">
                  <ShieldCheck className="absolute left-4 text-slate-500 w-5 h-5 pointer-events-none" />
                  <input
                    className="w-full rounded-xl border-none bg-white h-14 pl-12 pr-12 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base font-normal shadow-sm"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Action Button */}
          <div className="px-6 py-8 md:px-12">
            <button className="w-full h-16 bg-primary text-slate-900 text-lg font-bold rounded-xl shadow-lg shadow-primary/40 flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-[0.98] transition-all cursor-pointer">
              Sign Up
              <ArrowRight size={20} strokeWidth={3} />
            </button>
          </div>

          {/* Footer */}
          <div className="mt-auto py-8 text-center pb-12">
            <p className="text-slate-600 font-normal">
              Already have an account?
              <Link
                to="/login"
                className="text-slate-900 font-bold ml-1 hover:underline decoration-primary decoration-2 underline-offset-2"
              >
                Log In
              </Link>
            </p>
          </div>

          {/* Decorative Top Blur (Mobile Only) */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none md:hidden"></div>
        </div>
      </div>
    </div>
  );
}
