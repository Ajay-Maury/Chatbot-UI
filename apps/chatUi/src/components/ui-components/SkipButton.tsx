import React from 'react';
import styles from './index.module.css';

const SkipButton = ({ sendMessage,setInputMsg,messages }: { sendMessage: (arg: string) => void,setInputMsg:(arg:string)=>void,messages:any }) => {
    const previousText=messages[messages.length-2]?.message && messages[messages.length-2]?.position==='right' ?  messages[messages.length-2]?.message : ''
    const isSendMeg=messages[messages.length-1]?.message && messages[messages.length-1]?.position==='left'
    return (
        <div className={styles.skipBtnContainer}>
            <button className={styles.skipBtn} onClick={() => setInputMsg(previousText)}>
                Copy paste previous text
            </button>
            <button className={styles.skipBtn} onClick={() =>setInputMsg('can you ask this question in [other language]?')}>
                Can you ask this question in [other language]?
            </button>
            <button className={styles.skipBtn} disabled={!isSendMeg} style={{marginRight:'30px'}} onClick={() =>sendMessage('skip the question')}>
                Skip this question
            </button>
        </div>
    )
}

export default SkipButton