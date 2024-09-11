import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserData, postUserData } from "../../services/applicationFormApi";
import UserSelect from "../ui-components/UserSelect";
import styles from "./index.module.css";

const ChatUiWindow = dynamic(() => import("../ChatWindow/ChatUiWindow"), { ssr: false });

const ChatScreen = ({ userProfile, userName }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // const handleState = async () => {
  //   const userId = localStorage.getItem("userId") ?? "";
  //   const token = localStorage.getItem("userToken") ?? "";
  //   const resp = await getUserData(userId);
  //   const screen_closed = resp?.data?.screen_closed + 1;
  //   const request = {
  //     id: userId,
  //     screen_closed: screen_closed,
  //   };
  //   const resp1 = await postUserData(request, token, router);
  // };
  // useEffect(() => {
  //   handleState();
  // }, []);

  return (
    <>
      <div className={styles.interviewScreenContainer}>
        <div className={styles.interviewSideBarContainer}>
          <div className={styles.interviewSideBar}>
            <div>
              <UserSelect value={userName} logo={userProfile} />
              {/* <GetHelp /> */}
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
