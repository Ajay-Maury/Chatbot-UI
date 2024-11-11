import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "axios";

const Home: NextPage = () => {
  const router = useRouter();

  const verifyUser = async (email: string) => {
    try {
      // Fetch chat data from the API
      const { data } = await axios.post(`/api/verify-user`, { email });
      console.log("data:", data);
    } catch (error) {
      toast.error("Error verifying user. Please login again!!");
      console.error("Error verifying user:", error);
      localStorage.clear();
      router.push("/login");
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      localStorage.clear();
      router.push("/login");
    } else {
      const userData = JSON.parse(storedUserData);
      if (userData?.userId === "") {
        localStorage.clear();
        router.push("/sign-in");
      } else {
        verifyUser(userData.email);
        router.push(`/chat/${uuidv4()}`); // Redirect after successful login
      }
    }
  }, [router]);
  return (
    <>
      <Head>
        <title>HIA</title>
      </Head>
      <div>
        <LoadingScreen />
      </div>
    </>
  );
};
export default Home;
