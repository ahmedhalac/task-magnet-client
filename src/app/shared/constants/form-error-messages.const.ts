export const errorMessages = {
  firstName: [{ type: 'required', message: 'First name is required' }],
  lastName: [{ type: 'required', message: 'Last name is required' }],
  userName: [{ type: 'required', message: 'Username is required' }],
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Please enter a valid email address' },
  ],
  country: [{ type: 'required', message: 'Country is required' }],
  password: [{ type: 'required', message: 'Password is required' }],
};
