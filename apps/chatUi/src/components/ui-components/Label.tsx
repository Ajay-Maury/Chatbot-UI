import React from 'react'
import styles from './index.module.css'
import { BiSolidMessageAltError } from "react-icons/bi";
import { Tooltip } from '@chakra-ui/react';
import TooltipCard from '../recorder/TooltipCard';

const Label = ({ text, points=null,width='200px' }: { text: string, points?: string | string[] | null,width?:string }) => {
  return (
    <div className={styles.label}>{text}
    {/* @ts-ignore */}
      {points && <Tooltip
        label={
          <ol style={{ marginLeft: "10px", textAlign: "justify", padding: '10px' }}>
            {Array.isArray(points) ? points.map((point, index) => (
              <li key={index}>{point}</li>
            )) : points}
          </ol>
        }
        placement="bottom"
        minWidth={width}
      >
        <TooltipCard>
          <BiSolidMessageAltError size={17} style={{ cursor: "pointer" }} color='#8896AB' /></TooltipCard>
      </Tooltip>}
    </div>
  )
}

export default Label