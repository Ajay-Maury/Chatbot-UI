import React from 'react'
import logoutIcon from '../../assets/icons/logout.svg'
import styles from './index.module.css'
import Image from 'next/image'
const LogoutBtn = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className={styles.signoutBtn}
            style={{
                border: "1px solid #E8ECEF",
                backgroundColor: "#FFFFFF",
                borderRadius: "40px",
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center",
                padding: '4px',
            }}>
            <span style={{ paddingRight: '8px', display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                <Image src={logoutIcon} alt='icon' />
            </span>
            <span style={{
                marginRight: "10px",
                color: '#EE574D',
                fontFamily: "Segoe-regular",
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 'normal',

            }}>Sign Out</span>
        </button>
    )
}

export default LogoutBtn