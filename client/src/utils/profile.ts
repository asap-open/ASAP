import { api } from "./api";

// --- Types ---
export interface UserData {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface UserProfile {
  fullName: string | null;
  heightCm: number | null;
  targetWeightKg: number | null;
  latestWeightKg: number | null;
  unitPref: string;
  dateOfBirth: string | null;
  gender: string | null;
}

export interface FullProfileData {
  user: UserData;
  profile: UserProfile | null;
  previousWeight: number | null;
}

export const getBMIStatus = (bmi: number) => {
  if (bmi < 18.5) {
    return { text: "Underweight", color: "text-yellow-500" };
  } else if (bmi < 25) {
    return { text: "Normal", color: "text-primary" };
  } else if (bmi < 30) {
    return { text: "Overweight", color: "text-orange-500" };
  } else {
    return { text: "Obese", color: "text-red-500" };
  }
};

export const getBMIPosition = (bmi: number): number => {
  // Map BMI value (15-35 range) to percentage (0-100)
  const minBMI = 15;
  const maxBMI = 35;
  const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
  return ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;
};

export const formatMemberSince = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export const formatDateOfBirth = (dateString: string | null) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatGender = (gender: string | null) => {
  if (!gender) return "—";
  return gender.charAt(0).toUpperCase() + gender.slice(1);
};

/**
 * Fetches user profile, account data, and weight history to calculate previous weight.
 * Handles localStorage caching automatically.
 */
export const fetchFullUserProfile = async (
  token: string | null,
): Promise<FullProfileData> => {
  if (!token) throw new Error("No auth token provided");

  // 1. Fetch Profile Data
  const profileData = await api.get("/profile", token);

  const userObj: UserData = {
    id: profileData.id,
    username: profileData.username,
    email: profileData.email,
    createdAt: profileData.createdAt,
  };

  const profileObj: UserProfile | null = profileData.profile || null;

  // 2. Fetch Weight History (for previous weight comparison)
  let previousWeight: number | null = null;
  try {
    const weightHistory = await api.get("/weights/history", token);
    if (weightHistory && weightHistory.length > 1) {
      previousWeight = weightHistory[1].weightKg;
    }
  } catch (err) {
    console.warn("Failed to fetch weight history", err);
    // Non-critical, continue
  }

  // 3. Update Local Storage
  localStorage.setItem("user", JSON.stringify(userObj));
  localStorage.setItem("profile", JSON.stringify(profileObj || {}));
  if (previousWeight) {
    localStorage.setItem("previousWeight", JSON.stringify(previousWeight));
  } else {
    localStorage.removeItem("previousWeight");
  }

  return {
    user: userObj,
    profile: profileObj,
    previousWeight,
  };
};

/**
 * loads user data from local storage if available
 */
export const loadUserFromStorage = (): FullProfileData | null => {
  try {
    const localUser = localStorage.getItem("user");
    const localProfile = localStorage.getItem("profile");
    const localPreviousWeight = localStorage.getItem("previousWeight");

    if (localUser && localProfile) {
      return {
        user: JSON.parse(localUser),
        profile: JSON.parse(localProfile),
        previousWeight: localPreviousWeight
          ? JSON.parse(localPreviousWeight)
          : null,
      };
    }
  } catch (e) {
    console.error("Error parsing local storage", e);
  }
  return null;
};
