import axios from "axios";

export const signInUser = async (email) => {
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/login/`,
    { email: email }
  );
  return resp.data;
};

export const OTPVerification = async (otp, sessionId) => {
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/verify-otp/`,
    { otp: otp, session_id: sessionId }
  );
  return resp.data;
};
