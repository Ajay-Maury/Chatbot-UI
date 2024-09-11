import React, { useState } from 'react';
import styles from './index.module.css';
import videoIcon from '../../assets/icons/gVideoIcon.svg'
import Image from 'next/image';
import { Spinner } from '@chakra-ui/react'


const PercentageButton = ({ isVideoIcon = false, width = '220px', progress, loadingText = "Uploading",showPercentage=true }:
  { isVideoIcon?: boolean, width: string, progress: number, loadingText?: string,showPercentage?:boolean }) => {
  const barStyle = {
    width: `${progress}%`
  };



  return (
    <button className={styles.percentageButton} style={{ width: width }} >
      <div className={styles.percentageBar} style={barStyle}></div>

      <div className={styles.percentageText}
        style={{
          top: '40%',
          left: isVideoIcon ? '15%' : '22%',
          transform: 'translate(2%, -40%)',
          position: 'absolute'
        }}
      >{isVideoIcon && <Image src={videoIcon} alt='icon' />} {loadingText} {showPercentage && `${progress}%`} <span style={{ marginLeft: "10px" }}>
          {/* @ts-ignore */}
          <Spinner color='#007746' marginBottom={'-5px'} />
        </span></div>
    </button>
  );
};

export default PercentageButton;