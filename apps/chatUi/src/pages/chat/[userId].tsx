import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ChatScreen from "../../components/chat/ChatScreen";
import Navbar from "../../components/navbar/Navbar";
import Login from "../login";
import toast from "react-hot-toast";

const Interview: React.FC = () => {
  const [validUser, setValidUser] = useState(false); // Initially set to false until we validate
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    // Function to fetch user details from localStorage
    const fetchUserDetails = () => {
      const storedUserData = localStorage.getItem('userData');
      
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);

        // Check if the userId from the query matches the one in localStorage
        if (parsedUserData.userId == userId) {
          setValidUser(true);  // Set user as valid if IDs match
          setUserDetails(parsedUserData); // Set user details in state
        } else {
          setValidUser(false); // If userId doesn't match, user is not valid
          toast.error("User not found please login again..");
          router.push('/login')
        }
      } else {
        toast.error("User not found please login again..");
        router.push('/login')
      }
    };

    // Call the function once the userId is available from the query
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  
  // Log the data for debugging purposes
  console.log("Router Object:", router);
  console.log("User ID from Query:", userId);
  console.log("Valid User:", validUser);
  console.log("User Details:", userDetails);

  if (!userId) {
    return <Login/>; // Render a loading message while waiting for userId
  }
  return (
    <div>
      <Navbar />
      <div>{validUser ? <ChatScreen userProfile={""} userName={`Test user`} /> : <></>}</div>
    </div>
  );
};

export default Interview;
