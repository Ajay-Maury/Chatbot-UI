import React, { ReactNode } from 'react'
import styles from './index.module.css'
const ButtonFill = ({
    children,
    onClick,
    disable = false,
    width = '',
}: {
    children: ReactNode,
    onClick: () => void,
    disable?: boolean,
    width?: string
}) => {
    return (
        <button
            className={styles.btnFill}
            onClick={onClick}
            disabled={disable}
            style={{ width: width }}
        >
            {children}
        </button>
    )
}

export default ButtonFill