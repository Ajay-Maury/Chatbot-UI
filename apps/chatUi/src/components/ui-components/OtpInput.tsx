import { PinInput, PinInputField } from '@chakra-ui/react'
import React from 'react'
import styles from './index.module.css'

type propsType = {
    placeholder: string,
    errorMessage?: string,
    onChange: (arg: string) => void,
    value: string
}

const OtpInput = ({ placeholder, errorMessage = '', onChange, value }: propsType) => {
    return (
        <>
            <div className={styles.pinInputContainer} >
                <PinInput
                    size='md'
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}

                >
                    {/* @ts-ignore */}
                    <PinInputField style={{ border: errorMessage ? '1px solid red' : "" }} />
                    <PinInputField style={{ border: errorMessage ? '1px solid red' : "" }} />
                    <PinInputField style={{ border: errorMessage ? '1px solid red' : "" }} />
                    <PinInputField style={{ border: errorMessage ? '1px solid red' : "" }} />
                    <PinInputField style={{ border: errorMessage ? '1px solid red' : "" }} />
                    <PinInputField style={{ border: errorMessage ? '1px solid red' : "" }} />
                </PinInput>

            </div>
            {errorMessage && <div style={{ fontSize: '11px', color: 'red', textAlign: 'center', paddingTop: "8px" }}>
                {errorMessage}
            </div>}
        </>
    )
}

export default OtpInput