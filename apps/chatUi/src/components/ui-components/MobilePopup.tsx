import React from 'react'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import styles from './index.module.css'
import isbLogo from '../../assets/images/chat-gpt.png'
const MobilePopup = () => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    return (
        <Modal isCentered isOpen={true} onClose={() => { }} size='xs'>
            {OverlayOne()}
            {/* @ts-ignore */}
            <ModalContent>
                <ModalBody >
                    <div style={{
                        width: '100px', height: '70px', overflow: 'hidden', margin: 'auto', display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img src={isbLogo.src} alt="" />
                    </div>
                    <div className={styles.mobilePopupHeading}>Welcome</div>
                    <div className={styles.mobilePopupText}>This website is designed for viewing on a laptop or desktop computer. Please access it using a suitable device for the best experience.</div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default MobilePopup