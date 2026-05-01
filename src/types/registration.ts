export interface RegistrationData {
  fullName: string;
  phone: string;
  email: string;
  designation: string;
  institute: string;
  attendees: string;
  food: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  timestamp?: string;
}
