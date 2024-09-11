import React from 'react'
import styles from './index.module.css'
import ErrorMessage from './ErrorMessage'

type propType = {
    placeholder: string,
    errorMessage?: string,
    onChange: (arg: string, evt?: any) => void,
    type?: string,
    value: string | number,
    handleKeyChange?: (arg: any) => void
}

const InputField = (
    { placeholder,
        errorMessage,
        onChange,
        type = 'text',
        value,
        handleKeyChange = () => { }
    }: propType) => {


    // const handlePaste = (e: any) => {
    //     e.preventDefault()
    // }


    return (
        <>
            <input
                type={type}
                value={value}
                className={styles.inputField}
                placeholder={placeholder}
                style={{ border: errorMessage ? '1px solid red' : '' }}
                onChange={(e) => onChange(e.target.value, e)}
                onKeyUp={handleKeyChange}
                // onPaste={handlePaste}
            />
            <ErrorMessage text={errorMessage} />
        </>
    )
}

export default InputField