export interface SignupFormValues {
  email: string;
  password: string;
  name: string;
}

export interface SignupProps {
  onSignup: (values: SignupFormValues) => void;
  loading: boolean;
}
