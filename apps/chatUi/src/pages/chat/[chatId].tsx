import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AiOutlineWechat } from "react-icons/ai";
import styles from "./index.module.css";
import { Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import GptLogo from "../../assets/images/chat-gpt.png";
import axios from "axios";
import router from "next/router";
import Navbar from "../../components/navbar/Navbar";
import toast from "react-hot-toast";
import { Alert, Flex, Spin } from 'antd';

const ChatUiWindow = dynamic(() => import("../../components/ChatWindow/ChatUiWindow"), { ssr: false });

const ChatScreen = () => {
  const { chatId } = router.query;
  const [chatHistory, setChatHistory] = useState<any[]>([]); // Handle array of objects
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch user chat history from the API
  const getUserHistory = async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/api/chat-history?userId=${userId}`); // Fixed the endpoint
      console.log("data:", data);
      setChatHistory(data); // Update state with the fetched chat history
    } catch (error) {
      console.log("error:", error);
      setError("Chat history not found");
      console.error("Error fetching chat history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryChat = async (chatId: string) => {
    setLoading(true);
    try {
      // Fetch chat data from the API
      const { data } = await axios.get(`/api/fetch-chat?chat_id=${chatId}`);
      console.log("data:", data);

      if (data?.messages) {
        // Transform messages to the desired format
        const chats = data.messages.flatMap((message: any) => {
          const chatEntries = [];
        
          // Check if user message is not empty
          if (message.user) {
            // Add the user's message
            chatEntries.push({
              message: message.user,
              position: "right",
            });
          }

          if (message.coach) {
            chatEntries.push({
              message: [message.coach],
              position: "left",
              user: { avatar: GptLogo?.src }
            });
          }
        
          return chatEntries;
        });
        

        // Save transformed chats to localStorage
        localStorage.setItem("conversation", JSON.stringify(chats));
        router.push(`/chat/${chatId}`);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (email:string) => {
    setLoading(true);
    try {
      // Fetch chat data from the API
      const { data } = await axios.post(`/api/verify-user`,{ email });
      console.log('data:', data)
    } catch (error) {
      toast.error("Error verifying user. Please login again!!");
      console.error("Error verifying user:", error);
      localStorage.clear()
      router.push('/login')
    } finally {
      setLoading(false);
    }
  }

  // Use useEffect to call the function when the component mounts or when userId changes
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData") || "[]";
    const parsedUserData = JSON.parse(storedUserData) || {};
    const userId = parsedUserData?.userId;

    if(chatId){
      handleHistoryChat(chatId as string);
    } 
      if (userId) {
        verifyUser(parsedUserData.email)
        getUserHistory(userId);
      }
      else {
      router.push("/login");
    }
  }, [chatId]);

  const handleNewChat = () => {
    console.log('--------------handleNewChat clicked-----------:')
    
    const storedChats = JSON.parse(localStorage.getItem("conversation") || "");
    console.log('storedChats:', storedChats)
    console.log('storedChats.length:', storedChats.length)
    if (storedChats.length > 1) {
      localStorage.setItem("conversation", JSON.stringify([]));
      router.push(`/chat/${uuidv4()}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.interviewScreenContainer}>
        <div className={styles.interviewSideBarContainer}>
          <div className={styles.interviewSideBar}>
            <Button
              onClick={handleNewChat}
              style={{
                border: "3px solid #E2E8F0",
                width: "80%",
                display: "flex",
                background: "white",
                alignItems: "center",
                margin: "1rem",
                borderRadius: "35px",
                padding: "20px",
              }}
            >
              <div style={{ paddingLeft: "15px", fontSize: "1.7rem" }}>
                <AiOutlineWechat />
              </div>
              <div
                style={{
                  paddingLeft: "15px",
                  fontSize: "1.05rem",
                  fontWeight: "650",
                }}
              >
                New Chat
              </div>
            </Button>
            <hr />

            <div>
              <div style={{ textAlign: "center", marginTop: "5px" }}>
                <b style={{ color: "white", fontSize: "1.5rem" }}>History</b>
              </div>
              <div>
                {loading ? (
                  // <div style={{ color: "white", textAlign: "center" }}>Loading...</div>
                  <div style={{marginTop:"15%", width:"100%", display:"flex"}}>
                    <Spin style={{margin:"auto"}} tip="Loading" size="large"></Spin>
                  </div>
                ) : error ? (
                  <div style={{ color: "white", textAlign: "center" }}>{error}</div>
                ) : chatHistory.length > 0 ? (
                  chatHistory.map((data: any) => (
                    <Button
                      onClick={() => handleHistoryChat(data.chat_id)}
                      key={data.chat_id} // Add a unique key for each mapped element
                      style={{
                        border: "3px solid #E2E8F0",
                        width: "95%",
                        display: "flex",
                        background: "white",
                        margin: "10px 5px",
                        borderRadius: "35px",
                        fontSize: "1rem",
                        fontWeight: "600",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {data.chat_label || data.chat_id}
                      </div>
                    </Button>
                  ))
                ) : (
                  <div style={{ color: "white", textAlign: "center" }}>No chat history available</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "80%" }}>
          <ChatUiWindow />
        </div>
      </div>
    </>
  );
};

export default ChatScreen;
