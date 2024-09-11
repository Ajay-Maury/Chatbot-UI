'use client';
import React from 'react';
import profileDummy from '../../assets/images/profile_image.png'

export type OptionType = {
  label: string;
  value: string;
};

export type PropsType = {
  value: string;
  logo: string;
};

// import CourseProvider from '~/images/courseProvider.png';

const UserSelect = ({
  value,
  logo,
}: PropsType) => {
  return (
    <div style={{ padding: '6px 1px',margin:"10px 30px 10px 30px" }}>
      <div
        style={{ padding: "4px", display: "flex",overflow: "hidden", border: '1px solid #E3E7EF', borderRadius: "25px", backgroundColor: "#FFFFFF" }}>
        <div
          style={{
            display: 'flex', justifyContent: "center", alignItems: "center", overflow: "hidden", borderRadius: "50%",
            border: "1px solid #ccc",
          }}
        >
          
          <img src={logo ? logo : profileDummy.src} alt='profile' width={35} height={30} />
        </div>
        <div style={{ width: "85%", margin:"auto", padding:"0px 5px" }}>
          {value}
        </div>
      </div>
    </div>
  );
};

export default UserSelect;
