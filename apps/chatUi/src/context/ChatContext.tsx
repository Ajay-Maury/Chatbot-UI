import React, { ReactElement, useCallback, useContext, useState, createContext, useEffect, FC } from 'react'
import { v4 as uuidv4 } from "uuid";
import GptLogo from '../assets/images/chat-gpt.png'
import { IntlProvider } from "react-intl";
import { useLocalization } from '../hooks/useLocatization';
import axios from 'axios';
import { useRouter } from "next/router";
import { getUserData } from '../services/applicationFormApi';

type ContextType = {
  messages: any[],
  setMessages: React.Dispatch<React.SetStateAction<string[]>>,
  loading: boolean,
  setLoading: (arg: boolean) => void,
  isMsgReceiving: boolean,
  setIsMsgReceiving: (arg: boolean) => void,
  sendMessage: (text: string, media?: any) => void,
  locale: any,
  setLocale: any,
  localeMsgs: any,
  userId: string,
  userName: string,
  interviewPercentage: number,
  setInterviewPercentage: (arg: number) => void
}

// Define your initial context value
const initialContextValue: ContextType = {
  messages: [],
  setMessages: () => { },
  loading: false,
  setLoading: () => { },
  isMsgReceiving: false,
  setIsMsgReceiving: () => { },
  sendMessage: () => { },
  locale: '',
  setLocale: () => { },
  localeMsgs: '',
  userId: '',
  userName: '',
  interviewPercentage: 0,
  setInterviewPercentage: () => { }
}


function loadMessages(locale: string) {
  switch (locale) {
    case "en":
      return import("../../lang/en.json");
    case "hi":
      return import("../../lang/hi.json");
    case "od":
      return import("../../lang/od.json");
    default:
      return import("../../lang/en.json");
  }
}

const ChatProvider = createContext<ContextType>(initialContextValue)

interface PromptData {
  prompt: string | null;
  bot: any;
}

const ChatContext: FC<{
  locale: any;
  localeMsgs: any;
  setLocale: any;
  userObjId: any;
  children: ReactElement;
}> = ({ locale, children, userObjId, localeMsgs, setLocale }) => {
  const [list, setList] = useState<PromptData[]>([])
  const [messages, setMessages] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [isMsgReceiving, setIsMsgReceiving] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState("");
  const [interviewPercentage, setInterviewPercentage] = useState(0)
  const [inititalDataLoaded, setInitialDataLoaded] = useState(false)
  const router = useRouter();
  const { userId: paramsUserId } = router.query;

  const fetchUserId = async () => {
    // const storedUserId = await localStorage.getItem("userId") || "";
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserName(parsedUserData?.firstName)
    }
    console.log('paramsUserId', paramsUserId)
    if (paramsUserId) {
      setUserId(`${paramsUserId}`);
    }
    
    if (messages.length === 0 && localStorage.getItem("conversation")) {
      const conversation = localStorage.getItem("conversation") || "";
      setMessages(JSON.parse(conversation));
    }
    setInitialDataLoaded((pre)=>!pre);
  };

  useEffect(() => {
    fetchUserId();
  }, [messages.length,paramsUserId]);


  //@ts-ignore
  const sendMessage = useCallback(
    async (text: string, media: any) => {
      console.log("sendMessage text ---:", { text, media })

      setIsMsgReceiving(true);
      setLoading(true);
      //@ts-ignore
      setMessages((prev: any) => [
        ...prev.map((prevMsg: any) => ({ ...prevMsg })),
        {
          message: text,
          position: "right",
        },
      ]);

      console.log("messaging from the user");
      console.log(userId);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/`,
          {
            user_id: Number(userId),
            text,
            chat_id: "4a1bcffa-9f13-4fc8-9f21-7588eb292246"
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        const respMsges =  Array.isArray(data.result) ? data.result : [data.result];

        // Handle response here

        setMessages((prev: any) => [
          ...prev.map((prevMsg: any) => ({ ...prevMsg })),
          {
            message: respMsges,
            position: "left",
            user: { avatar: GptLogo?.src },
            options: response.data.options || [],
            prompt: response.data.prompt || "text_message",
          },
        ]);
        console.log(messages)
        localStorage.setItem("conversation", JSON.stringify(
          [
            ...messages,
            { message: text, position: 'right' },
            { message: respMsges, position: 'left', user: { avatar: GptLogo?.src }, },
          ]
        ))
        setIsMsgReceiving(false);
        setLoading(false)
      } catch (error) {
        // Handle error here
        setMessages((prev: any) => [
          ...prev.map((prevMsg: any) => ({ ...prevMsg })),
          {
            message: ['Something went wrong, please paste the previous message and try again.'],
            position: "left",
            user: { avatar: GptLogo?.src }
          },
        ]);
        setIsMsgReceiving(false);
        setLoading(false);
        console.log(error);
      }
    }
  );
  useEffect(() => {
    if (userId && messages && messages.length == 0) {
      sendMessage('Hello', '')
    }
  }, [inititalDataLoaded])

  return (

    <ChatProvider.Provider
      value={{
        messages,
        setMessages,
        loading,
        setLoading,
        isMsgReceiving,
        setIsMsgReceiving,
        sendMessage,
        locale,
        setLocale,
        localeMsgs,
        userId,
        userName,
        interviewPercentage,
        setInterviewPercentage
      }}>
      <IntlProvider
        locale={locale ?? 'en'}
        //@ts-ignore
        messages={localeMsgs}>
        {children}
      </IntlProvider>
    </ChatProvider.Provider>
  )
}


// export default ChatContext

const SSR: FC<{ children: ReactElement }> = ({ children }) => {
  const [locale, setLocale] = useState("");
  const [userId, setUserId] = useState("");
  const [localeMsgs, setLocaleMsgs] = useState<Record<string, string> | null>(
    null
  );

  const fetchUserId = async () => {
    const userId = await localStorage.getItem('userId') || ""
    await setUserId(userId);
  }



  useEffect(() => {
    loadMessages(locale).then((res) => {
      //@ts-ignore
      setLocaleMsgs(res);
    });
    fetchUserId()
  }, [locale]);

  if (typeof window === "undefined") return null;
  return (
    //@ts-ignore
    <IntlProvider locale={locale} messages={localeMsgs}>
      <ChatContext
        locale={locale ?? 'en'}
        setLocale={setLocale}
        localeMsgs={localeMsgs}
        userObjId={userId}
      >
        {children}
      </ChatContext>
    </IntlProvider>
  );
};
export default SSR;

export const useChatContext = () => useContext(ChatProvider);
