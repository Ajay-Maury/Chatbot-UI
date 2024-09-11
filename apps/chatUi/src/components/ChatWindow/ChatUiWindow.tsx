//@ts-ignore
import Chat from "chatui";
import openai from "openai";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useChatContext } from "../../context/ChatContext";
import { useLocalization } from "../../hooks/useLocatization";
import { getMsgType } from "../../utils/getMsgType";
import ChatMessageItem from "../chat-message-item";
import RenderOptionAndInformation from "../options-and-information";
import RenderVoiceRecorder from "../recorder/RenderVoiceRecorder";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
// @ts-ignore
openai.apiKey = OPENAI_API_KEY;

const ChatUiWindow: React.FC = () => {
  const { messages, sendMessage, isMsgReceiving, setMessages, setLocale, userName,loading } = useChatContext()
  const [showRecording, setShowRecording] = useState(false)
  const t = useLocalization();

  const name = "DIKSHA"
  const designation = t('label.designation')
  const placeholder = t('label.placeholder')
  const refreshLabel = t('message.refresh_label')

  const profileData = { name: name, rating: 4.5, designation: designation }

  console.log('messagess==========', messages)

  const options = messages[messages.length - 1]?.options ? messages[messages.length - 1]?.options : null
  const information = messages[messages.length - 1]?.information && messages[messages.length - 1]?.information?.length > 0 ? messages[messages.length - 1]?.information : null
  const optionType = messages[messages.length - 1]?.prompt ?? ''
  const isChatEnd = messages[messages.length - 1]?.status === 'Success' && messages[messages.length - 1]?.end_connection ? true : false

  const optionsAndInformationProps = {
    options,
    optionType,
    information,
    sendMessage,
    setMessages,
    setLocale
  }

  const [divHeight, setDivHeight] = useState<any>("91%");

  const updateDivHeight = () => {
    const newHeight =
      window.innerHeight - 60;
    setDivHeight(newHeight);
  };

  useEffect(() => {
    updateDivHeight();
    window.addEventListener("resize", updateDivHeight);
    return () => {
      window.removeEventListener("resize", updateDivHeight);
    };
  }, []);

  const handleSend = useCallback(
    async (type: string, msg: any) => {
      if (msg.length === 0) {
        toast.error('please enter text');
        return;
      }

      if (type === "text" && msg.trim()) {
        console.log('first', msg)
        sendMessage(msg.trim())
      }
    },
    [sendMessage]
  );

  const normalizeMsgs = useMemo( () =>
      messages?.map((msg: any) => ({
        type: getMsgType(msg),
        content: { text: msg?.text, data: { ...msg } },
        position: msg?.position ?? "right",
      })),
    [messages]
  );

  const msgToRender = useMemo(() => {
    console.log('norma===============',normalizeMsgs)
    return isMsgReceiving
      ? [
        ...normalizeMsgs,
        {
          type: "loader",
          position: "left",
          botUuid: "1",
        },
      ]
      : normalizeMsgs;
  }, [isMsgReceiving, normalizeMsgs]);


  // const onRefresh = () => {
  //   if (window.confirm(refreshLabel)) {
  //     window.location.reload()
  //   }
  // }

  return (
    <>
      <div
        style={{
          // position: "fixed",
          height: divHeight,
          width: "100%",
          // bottom: 0,
          // top: "63px",
          paddingBottom: '30px',
          borderTopRightRadius: "20px",
          borderTopLeftRadius: "20px",
          textAlign: "center",
        }}
      >
        <Chat
          btnColor="green"
          background="white"
          messages={msgToRender}
          optionsAndInformation={RenderOptionAndInformation}
          // optionsAndInformationProps={optionsAndInformationProps}
          recordingContent={RenderVoiceRecorder}
          recordingProps={{ sendMessage, setShowRecording, showRecording }}
          // isChatEnd={isChatEnd}
          disableSend={loading}
          renderMessageContent={(props: any): ReactElement => (
            <ChatMessageItem
              key={props}
              message={props}
              onSend={handleSend}
            />
          )}
          onSend={handleSend}
          locale="en-US"
          // skipButton={SkipButton}
          // skipButtonProps={{sendMessage,messages}}
          placeholder={'Speak using microphone button, or type your answer here...'}
          optionType={optionType === 'text_message' || optionType === 'link' || !optionType}
          // handleRecording={handleStartRecording}
          isShowRecording={showRecording}
        />
      </div>
    </>
  );
};

export default ChatUiWindow;
