import z from 'zod';

const passwordRequirements = {
  min: 8,
  max: 24,
  upper: 1,
  lower: 1,
  number: 1,
  special: 1,
};

const validatePassword = (password: string) => {
  // Check password requirements one by one
  if (password.length < passwordRequirements.min) {
    return `La contraseña debe tener al menos ${passwordRequirements.min} caracteres`;
  }
  if (password.length > passwordRequirements.max) {
    return `La contraseña debe tener menos de ${passwordRequirements.max} caracteres`;
  }
  if (password.length - password.replace(/[A-Z]/g, '').length < passwordRequirements.upper) {
    return `La contraseña debe tener al menos ${passwordRequirements.upper} mayúscula`;
  }
  if (password.length - password.replace(/[a-z]/g, '').length < passwordRequirements.lower) {
    return `La contraseña debe tener al menos ${passwordRequirements.lower} minúscula`;
  }
  if (password.length - password.replace(/[0-9]/g, '').length < passwordRequirements.number) {
    return `La contraseña debe tener al menos ${passwordRequirements.number} número`;
  }
  if (password.length - password.replace(/[^a-zA-Z0-9]/g, '').length < passwordRequirements.special) {
    return `La contraseña debe tener al menos ${passwordRequirements.special} caracter especial`;
  }
  return '';
};

const validateEmail = (email: string) => {
  const emailValidation = z.string().email();
  try {
    emailValidation.parse(email);
  } catch (error) {
    return 'El correo ingresado no es válido';
  }
  return '';
};

export { validatePassword, validateEmail };
