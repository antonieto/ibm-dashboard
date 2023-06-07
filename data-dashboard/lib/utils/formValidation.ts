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
  const passwordValidation = z.string()
    .min(passwordRequirements.min, { message: `La contraseña debe tener al menos ${passwordRequirements.min} caracteres` })
    .max(passwordRequirements.max, { message: `La contraseña debe tener menos de ${passwordRequirements.max} caracteres` })
    .regex(/[A-Z]/, { message: `La contraseña debe tener al menos ${passwordRequirements.upper} mayúscula` })
    .regex(/[a-z]/, { message: `La contraseña debe tener al menos ${passwordRequirements.lower} minúscula` })
    .regex(/[0-9]/, { message: `La contraseña debe tener al menos ${passwordRequirements.number} número` })
    .regex(/[^a-zA-Z0-9]/, { message: `La contraseña debe tener al menos ${passwordRequirements.special} caracter especial` });
  try {
    passwordValidation.parse(password);
    return '';
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues[0].message;
    }
    return 'La contraseña no es válida';
  }
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
