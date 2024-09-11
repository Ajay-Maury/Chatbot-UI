import React, { ReactNode } from 'react'
import styles from './index.module.css'

const LinkedInBtn = ({ children,onClick }: { children: ReactNode,onClick:()=>void }) => {
    return (
        <button className={styles.LinkedInBtn} onClick={onClick}>
            {children}
        </button>
    )
}

export default LinkedInBtn