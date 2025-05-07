export const isRequired = (value: any): boolean => {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return true;
  return !!value;
};

export const isEmail = (value: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(value);
};

export const isPhone = (value: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(value);
};

export const isUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const minLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

export const maxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

export const isNumeric = (value: string): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
};

export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

export const isAlpha = (value: string): boolean => {
  return /^[a-zA-Z]+$/.test(value);
};

export const isAlphanumeric = (value: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(value);
};

export const isMatch = (value: string, pattern: RegExp): boolean => {
  return pattern.test(value);
};

export const isPasswordStrong = (value: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(value);
};

export const getPasswordStrength = (value: string): number => {
  let strength = 0;

  // Length check
  if (value.length >= 8) strength += 1;
  if (value.length >= 12) strength += 1;

  // Character type checks
  if (/[a-z]/.test(value)) strength += 1; // lowercase
  if (/[A-Z]/.test(value)) strength += 1; // uppercase
  if (/\d/.test(value)) strength += 1; // numbers
  if (/[@$!%*?&]/.test(value)) strength += 1; // special characters

  return strength;
};

export const validateForm = <T extends { [key: string]: any }>(
  values: T,
  rules: { [K in keyof T]?: Array<(value: any) => boolean | string> }
): { [K in keyof T]?: string } => {
  const errors = {} as { [K in keyof T]?: string };

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field as keyof T] || [];
    const value = values[field as keyof T];

    for (const rule of fieldRules) {
      const result = rule(value);
      if (typeof result === 'string') {
        errors[field as keyof T] = result;
        break;
      } else if (!result) {
        errors[field as keyof T] = `Invalid ${field}`;
        break;
      }
    }
  });

  return errors;
}; 