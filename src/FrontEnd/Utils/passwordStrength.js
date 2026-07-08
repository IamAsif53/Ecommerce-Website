export const getPasswordStrength = (password) => {
  let score = 0;

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  Object.values(checks).forEach((passed) => {
    if (passed) score++;
  });

  let strength = "Very Weak";
  let color = "bg-red-500";

  if (score === 2) {
    strength = "Weak";
    color = "bg-orange-500";
  }

  if (score === 3) {
    strength = "Medium";
    color = "bg-yellow-500";
  }

  if (score === 4) {
    strength = "Strong";
    color = "bg-blue-500";
  }

  if (score === 5) {
    strength = "Very Strong";
    color = "bg-green-600";
  }

  return {
    score,
    strength,
    color,
    checks,
  };
};
