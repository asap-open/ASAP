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
