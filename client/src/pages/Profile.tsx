import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Bell, LogOut, Shield, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";

interface UserData {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

interface UserProfile {
  heightCm: number | null;
  targetWeightKg: number | null;
  unitPref: string;
}

interface WeightLog {
  weightKg: number;
  recordedAt: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const { logout, token } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [latestWeight, setLatestWeight] = useState<WeightLog | null>(null);
  const [previousWeight, setPreviousWeight] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);

      // Fetch user profile data from API
      const profileData = await api.get("/profile", token);
      setUser({
        id: profileData.id,
        username: profileData.username,
        email: profileData.email,
        createdAt: profileData.createdAt,
      });

      // Set profile data
      if (profileData.profile) {
        setProfile(profileData.profile);
      }

      // Fetch weight history
      const weightHistory = await api.get("/weight/history", token);
      if (weightHistory && weightHistory.length > 0) {
        setLatestWeight(weightHistory[0]);
        if (weightHistory.length > 1) {
          setPreviousWeight(weightHistory[1].weightKg);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const calculateBMI = () => {
    if (!latestWeight?.weightKg || !profile?.heightCm) return null;
    const heightM = profile.heightCm / 100;
    return (latestWeight.weightKg / (heightM * heightM)).toFixed(1);
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { text: "Underweight", color: "text-yellow-500" };
    if (bmi < 25) return { text: "Healthy", color: "text-primary" };
    if (bmi < 30) return { text: "Overweight", color: "text-orange-500" };
    return { text: "Obese", color: "text-red-500" };
  };

  const getBMIPosition = (bmi: number) => {
    // Map BMI to gradient position (18.5-30 range mapped to 0-100%)
    const minBMI = 15;
    const maxBMI = 35;
    const position = ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
    return Math.max(0, Math.min(100, position));
  };

  const calculateWeightChange = () => {
    if (!latestWeight || !previousWeight) return null;
    const change = latestWeight.weightKg - previousWeight;
    const percentChange = (change / previousWeight) * 100;
    return {
      value: Math.abs(percentChange).toFixed(1),
      isDecrease: change < 0,
    };
  };

  const formatMemberSince = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const bmi = calculateBMI();
  const bmiStatus = bmi ? getBMIStatus(parseFloat(bmi)) : null;
  const weightChange = calculateWeightChange();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="w-10 h-10 flex items-center justify-start">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-slate-100 rounded-lg transition-colors p-1"
          >
            <ArrowLeft size={20} className="text-text-muted" />
          </button>
        </div>
        <h1 className="text-lg font-bold">Profile</h1>
        <div className="w-10 h-10 flex items-center justify-end">
          <button className="flex items-center justify-center p-1 rounded-full active:bg-slate-200/50 transition-colors">
            <Settings size={24} className="text-text-main" strokeWidth={2} />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto pb-32">
        {/* Profile Header */}
        <section className="px-6 pt-10 pb-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {user?.username}
          </h2>
          <p className="text-text-muted text-sm mt-2 font-medium">
            Member since{" "}
            {user?.createdAt ? formatMemberSince(user.createdAt) : "—"}
          </p>
          <button className="mt-4 text-primary font-semibold text-xs uppercase tracking-wider py-2 px-6 border border-primary/20 rounded-full bg-primary/5 active:scale-95 transition-transform">
            Edit Profile
          </button>
        </section>

        {/* Physical Attributes */}
        <section className="px-6 mb-4">
          <div className="bg-surface rounded-xl p-5 shadow-sm border border-slate-200">
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-4">
              Physical Attributes
            </p>
            <div className="grid grid-cols-3 divide-x divide-slate-200">
              <div className="flex flex-col items-center px-2">
                <span className="text-lg font-bold">
                  {profile?.heightCm || "—"}{" "}
                  <span className="text-xs text-slate-400 font-normal">cm</span>
                </span>
                <span className="text-[11px] text-text-muted mt-1">Height</span>
              </div>
              <div className="flex flex-col items-center px-2">
                <span className="text-lg font-bold">Male</span>
                <span className="text-[11px] text-text-muted mt-1">Gender</span>
              </div>
              <div className="flex flex-col items-center px-2 text-center">
                <span className="text-sm font-bold leading-tight">
                  May 12, 1994
                </span>
                <span className="text-[11px] text-text-muted mt-1">
                  Birthdate
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* User Management */}
        <section className="px-6 mb-6">
          <div className="bg-surface rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <div className="px-5 pt-4 pb-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                User Management
              </p>
            </div>
            <button className="w-full flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield size={20} className="text-primary" />
                </div>
                <span className="text-sm font-medium">Account Security</span>
              </div>
              <svg
                className="w-4 h-4 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lock size={20} className="text-primary" />
                </div>
                <span className="text-sm font-medium">Privacy Settings</span>
              </div>
              <svg
                className="w-4 h-4 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* Weight & BMI Cards */}
        <section className="px-6 grid grid-cols-2 gap-4">
          {/* Weight Card */}
          <div className="bg-surface rounded-xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between h-36">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
                <p className="text-sm font-medium text-text-muted">Weight</p>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {latestWeight?.weightKg?.toFixed(1) || "—"}{" "}
                <span className="text-sm font-normal text-slate-400">kg</span>
              </p>
              {weightChange && (
                <div className="flex items-center gap-1 mt-1">
                  <svg
                    className={`w-3 h-3 ${weightChange.isDecrease ? "text-emerald-500" : "text-red-500"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d={
                        weightChange.isDecrease
                          ? "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                          : "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                      }
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    className={`text-[10px] font-bold ${weightChange.isDecrease ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {weightChange.value}% this week
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* BMI Card */}
          <div className="bg-surface rounded-xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between h-36">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="text-sm font-medium text-text-muted">BMI</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <p className="text-2xl font-bold">{bmi || "—"}</p>
                {bmiStatus && (
                  <span
                    className={`text-[10px] font-bold ${bmiStatus.color} uppercase`}
                  >
                    {bmiStatus.text}
                  </span>
                )}
              </div>
              {bmi && (
                <div className="w-full h-1.5 rounded-full bg-slate-100 relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background:
                        "linear-gradient(90deg, #fbbf24 0%, #13ecd6 50%, #ef4444 100%)",
                    }}
                  />
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-primary rounded-full ring-2 ring-surface"
                    style={{ left: `${getBMIPosition(parseFloat(bmi))}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="px-6 mt-8">
          <div className="bg-surface rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-slate-400" />
                <span className="text-sm font-medium">Notifications</span>
              </div>
              <svg
                className="w-4 h-4 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3 text-red-500">
                <LogOut size={20} />
                <span className="text-sm font-medium">Log Out</span>
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
