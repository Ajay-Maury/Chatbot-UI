import axios from "axios";
import toast from "react-hot-toast";

export const postUserData = async (request, token, router) => {
  try {
    const resp = await axios.post(`${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/updatedetails/`,request, {
      headers:{"Authorization":`Bearer ${token}`}
    });
    return resp;
  } catch (e) {
    console.log("ERROR", e?.response?.data?.detail)
    if(e?.response?.data?.detail=="Token has expired"){
      toast?.error("User session has expired");
      router.push('sign-in');
      localStorage.clear()
      return
    }
    toast?.error("Something went wrong please try again!");
  }
};

export const getUserData = async (userId) => {
  try {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/getuserdetail/${userId}/`);
    return resp;
  } catch (e) {
    console.log("Something went wrong");
  }
};

export const getInterviewData = async (userId) => {
  try {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/question-attempted/${userId}/`);
    return resp.data;
  } catch (e) {
    console.log("Something went wrong");
  }
};

export const getPreSignApi = async () => {
  const resp = await axios.get(`${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/generate-presignedurl/`);
  return resp.data;
};

export const checkVideoSize = async (formData,maxDuration) => {
  const resp = await axios.post(`${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/video-upload/?max_duration=${maxDuration}`,formData);
  return resp.data;
};

export const createOrder = async (data) => {
  try {
    const resp = await axios.post(`${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/createorder/`, data);
    console.log(resp);
    return resp.data;
  } catch (e) {
    console.log("Something went wrong");
  }
  
};

export const preSignApiCall = async (url, data, type,handleProgress=()=>{}) => {
  const resp = await axios.put(url, data, {
    headers: {
      "Content-Type": type ?? "image/png",
    }, onUploadProgress: (progressEvent) => {
      const uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      handleProgress(uploadProgress);
  }
  });
  console.log(resp);
  return resp;
};

export const postResume = async (formData) => {
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/file-upload/`,
    formData
  );
  return resp.data;
};
