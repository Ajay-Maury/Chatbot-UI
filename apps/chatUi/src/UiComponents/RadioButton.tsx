import { Radio } from '@chakra-ui/react'
import React from 'react'

const RadioButton = ({ label, value, a, className, onChange }:
    { label: string, value: string, a: string, className: string, onChange: (arg: string) => void }) => {
    return (
        <div className={className}>
            <Radio
                value={value}
                isChecked={value === a}
                onChange={() => onChange(value)}
            >{label}</Radio>
        </div>
    )
}

export default RadioButton