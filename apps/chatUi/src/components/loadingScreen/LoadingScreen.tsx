import React from 'react'
import styles from './index.module.css'
const LoadingScreen = () => {
    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ position: "relative" }}>
                        <div className={styles.spinnerCircle}></div>
                        <div className={styles.spinnerSpinner}></div>
                    </div>
                </div>

                <p
                    style={{
                        textAlign: "center",
                        margin: '20px',
                        fontFamily: "Segoe-regular",
                        fontSize: '26px',
                        fontWeight: 500
                    }}>
                    Loading...
                </p>
            </div>
        </div>
    )
}

export default LoadingScreen