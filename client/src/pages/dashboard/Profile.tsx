import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "../../components/profile/EditProfileModal";
import ProfileHeader from "../../components/profile/ProfileHeader";
import PhysicalAttributes from "../../components/profile/PhysicalAttributes";
import WeightCard from "../../components/profile/WeightCard";
import BMICard from "../../components/profile/BMICard";
import UserManagement from "../../components/profile/UserManagement";
import ActionButtons from "../../components/profile/ActionButtons";
import { fetchFullUserProfile, loadUserFromStorage } from "../../utils/profile";
import type { UserData, UserProfile } from "../../utils/profile";
import LoadingScreen from "../../components/ui/Loading";

export default function Profile() {
  const navigate = useNavigate();
  const { logout, token } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [previousWeight, setPreviousWeight] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchFullUserProfile(token);
      setUser(data.user);
      setProfile(data.profile);
      setPreviousWeight(data.previousWeight);
    } catch (error) {
      console.error("Error loading user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Try to load from local storage first
    const localData = loadUserFromStorage();
    if (localData) {
      setUser(localData.user);
      setProfile(localData.profile);
      setPreviousWeight(localData.previousWeight || null);
      setIsLoading(false);
    } else {
      loadData();
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const calculateBMI = () => {
    if (!profile?.latestWeightKg || !profile?.heightCm) return null;
    const heightM = profile.heightCm / 100;
    return (profile.latestWeightKg / (heightM * heightM)).toFixed(1);
  };

  const calculateWeightChange = () => {
    if (!profile?.latestWeightKg || !previousWeight) return null;
    const change = profile.latestWeightKg - previousWeight;
    const percentChange = (change / previousWeight) * 100;
    return {
      value: Math.abs(percentChange).toFixed(1),
      isDecrease: change < 0,
    };
  };

  const bmi = calculateBMI();
  const weightChange = calculateWeightChange();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-muted">User not found</div>
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
        <ProfileHeader
          fullName={profile?.fullName || null}
          username={user.username}
          createdAt={user.createdAt}
          onEditClick={() => setIsEditModalOpen(true)}
        />

        <PhysicalAttributes
          heightCm={profile?.heightCm || null}
          gender={profile?.gender || null}
          dateOfBirth={profile?.dateOfBirth || null}
        />

        <UserManagement />

        {/* Weight & BMI Cards */}
        <section className="px-6 grid grid-cols-2 gap-4 mb-6">
          <WeightCard
            latestWeightKg={profile?.latestWeightKg || null}
            weightChange={weightChange}
          />
          <BMICard bmi={bmi} />
        </section>

        <ActionButtons onLogout={handleLogout} />
      </main>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={loadData}
        token={token}
        currentProfile={profile}
      />
    </div>
  );
}
