import {
    Bubble,
    ScrollView,
    Typing,
} from "chatui";
// import axios from "axios";
import { Button } from "@chakra-ui/react";
import {
    FC,
    ReactElement, useEffect, useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import chatIcon from '../../assets/images/chat-gpt.png';
import profileImage from '../../assets/images/profile_image.png';
import { ChatMessageItemPropType } from "../../types";
import styles from './index.module.css';

const ChatMessageItem: FC<ChatMessageItemPropType> = ({
    message,
    onSend,
}) => {

    const { content, type } = message;
    const [profilePic, setProfilePic] = useState(profileImage.src)
    useEffect(() => {
        const profile = localStorage.getItem('userProfile') || profileImage.src
        setProfilePic(profile);
    }, [profilePic]);
    // const bubbleStyle = content?.data?.position === 'left' ? styles.left : styles.right;

    switch (type) {
        case "loader":
            return <div className={styles.loadingProfileContainer}>
                <span className={styles.profileContainer}>
                    <img src={chatIcon.src} alt='profile' className={styles.profileImage} />
                </span>
                <div className={styles.loadingContainer}>
                    <Typing />
                </div>
            </div>;
        case "text":
            const messageContent = content?.data?.message;
            if (Array.isArray(messageContent)) {
                return (
                    <div className={`${styles.speechBubbleContainer}`}>
                        {messageContent?.map((text, index) => (
                            <Bubble
                                key={uuidv4()}
                                type="text"
                                style={{
                                    textAlign: 'left',
                                    position: "relative",
                                    backgroundColor: '#FBE9DC',
                                    minWidth: '175px',
                                    marginTop: '8px'
                                }}
                            >
                                {text}
                            </Bubble>
                        ))}
                    </div>
                );
            } else {
                return (
                    <div className={`${styles.speechBubbleContainer}`}>
                        <div style={{ display: 'flex', paddingTop: '10px' }}>
                            <img src={profilePic} className={styles.userImage} alt="profile" height={'40px'} width='40px' />
                            <Bubble
                                type="text"
                                style={{
                                    textAlign: 'left',
                                    position: "relative",
                                    marginTop: "8px",
                                    backgroundColor: '#F0F6FE',
                                    minWidth: '175px'
                                }}
                            >
                                {messageContent}
                            </Bubble>
                        </div>
                    </div>
                );
            }
        default:
            return (
                <ScrollView
                    data={[]}
                    // @ts-ignore
                    renderItem={(item): ReactElement => <Button label={item.text} />}
                />
            );
    }
};

export default ChatMessageItem;
