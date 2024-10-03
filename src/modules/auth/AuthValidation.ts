import { z } from 'zod';

// Define validation schema for login
export const LoginValidation = z.object({
  username: z.string().min(1, { message: "Username is required (e.g., 'user123')" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long (e.g., 'Password@123')" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter (e.g., 'Password@123')" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter (e.g., 'Password@123')" })
    .regex(/[0-9]/, { message: "Password must contain at least one number (e.g., 'Password@123')" })
    .regex(/[\W_]/, { message: "Password must contain at least one special character (e.g., 'Password@123')" }),
});

// Define validation schema for registration
export const RegisterValidation = z
  .object({
    first_name: z.string().min(1, { message: 'First name is required' }),
    last_name: z.string().min(1, { message: 'Last name is required' }),
    username: z.string().min(1, { message: "Username is required (e.g., 'user123')" }),
    email: z.string().email({ message: "A valid email is required (e.g., 'user@example.com')" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long (e.g., 'Password@123')" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter (e.g., 'Password@123')" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter (e.g., 'Password@123')" })
      .regex(/[0-9]/, { message: "Password must contain at least one number (e.g., 'Password@123')" })
      .regex(/[\W_]/, { message: "Password must contain at least one special character (e.g., 'Password@123')" }),
    repeat_password: z
      .string()
      .min(8, { message: "Repeat password must be at least 8 characters long (e.g., 'Password@123')" })
      .regex(/[a-z]/, { message: "Repeat password must contain at least one lowercase letter (e.g., 'Password@123')" })
      .regex(/[A-Z]/, { message: "Repeat password must contain at least one uppercase letter (e.g., 'Password@123')" })
      .regex(/[0-9]/, { message: "Repeat password must contain at least one number (e.g., 'Password@123')" })
      .regex(/[\W_]/, { message: "Repeat password must contain at least one special character (e.g., 'Password@123')" }),
  })
  .superRefine((data, ctx) => {
    if (data.repeat_password !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords must match',
        path: ['repeat_password'], // Path for the issue
      });
    }
  });

// Define validation schema for forgot password
export const ForgotPasswordValidation = z.object({
  email: z.string().email({ message: "A valid email is required (e.g., 'user@example.com')" }),
});
