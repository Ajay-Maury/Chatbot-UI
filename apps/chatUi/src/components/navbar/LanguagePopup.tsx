import { Button, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useChatContext } from '../../context/ChatContext';
import { useLocalization } from '../../hooks/useLocatization';
import RadioButton from '../../UiComponents/RadioButton';
import styles from './index.module.css';
const OverlayOne = () => (
    <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
    />
)

const LanguagePopup = ({ isOpen, onClose }:
    { isOpen: boolean, onClose: () => void, }) => {
    const { locale, setLocale } = useChatContext()
    // const [language, setLanguage] = useState(locale)
    // console.log('locale====inside check', locale, language)

    const t = useLocalization();

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {OverlayOne()}
            <ModalContent>
                <ModalBody style={{ margin: 'auto', padding: '20px 0px', width: '80%' }}>
                    <div className={styles.chooseLanguageText} >
                        {t('label.choose_your_language')}
                    </div>
                    <RadioButton
                        label={'English'}
                        value='en'
                        a={locale}
                        className={styles.RadioBtn}
                        onChange={() => {
                            localStorage.setItem("locale", 'en')
                            setLocale('en')
                        }}
                    />
                    <RadioButton
                        label={'हिंदी'}
                        value='hi'
                        a={locale}
                        className={styles.RadioBtn}
                        onChange={() => {
                            localStorage.setItem("locale", 'hi')
                            setLocale('hi')
                        }}
                    />
                    <RadioButton
                        label={'ଓଡିଆ'}
                        value='od'
                        a={locale}
                        className={styles.RadioBtn}
                        onChange={() => {
                            localStorage.setItem("locale", 'od')
                            setLocale('od')
                        }}
                    />
                    <div className={styles.submitBtn} onClick={onClose} >
                        {t('label.submit')}
                    </div>
                </ModalBody>

            </ModalContent>
        </Modal>
    )
}

export default LanguagePopup