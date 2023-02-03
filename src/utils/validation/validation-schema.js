import * as yup from 'yup';

export const signUpSchema = yup.object({
    name: yup
      .string('Enter your full name')
      .min(3, 'Name should be of minimum 3 characters')
      .max(20, 'Name should be of maximum 20 characters')
      .matches(/^[a-zA-Z]+\s|[a-zA-Z]/)
      .required('Name is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters')
      .required('Password is required'),
    passwordConfirmation: yup.mixed()
     .oneOf([yup.ref('password'), null], 'Passwords not match')
  });

  export const signInSchema=yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters')
      .required('Password is required'),
  });

  export const changePasswordSchema=yup.object({
    oldPassword: yup
      .string('Enter old password')
      .required('Old password is required'),
    newPassword: yup
      .string('Enter new password')
      .min(8, 'Password should be of minimum 8 characters')
      .required('New password is required'),
    confirmPassword: yup
      .string('Enter confirm password')
      .oneOf([yup.ref('newPassword'),null],'Enter correct password to confirm ')
      .required('Confirm password is required'),
  });


  
const optionSchema=yup.array()
  .min(2,'You set minimum two options')
  .required('You must have enter atleast two options');

export const createPollSchema = yup.object({
  ques: yup
    .string('Enter your question')
    .max(150, 'Question should be of maximum 150 characters')
    .required('Question is required'),
  image: yup.string('Enter your image'),
  options: optionSchema,
  endDate:yup.string('Enter the date when expires on')
    .required('Expiry date is required')
});
