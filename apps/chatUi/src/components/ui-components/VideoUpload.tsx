import React, { useRef, useState } from 'react'
import videoIcon from '../../assets/icons/videoIcon.svg'
import Image from 'next/image';
import styles from './index.module.css';
import PercentageButton from './PercentageButton';
import { checkVideoSize, getPreSignApi, preSignApiCall } from '../../services/applicationFormApi';
import { applicationQuestionErrorType } from '../../types/application-type/applicationInterface';
import { CSSProperties } from "react"
import { FaFileVideo } from "react-icons/fa6";
import toast from 'react-hot-toast';

const fileSizeValidation = (file: File,fileSizeLimit:number) => {
    if (file) {
        const fileSize = file.size; // size in bytes
        const fileSizeInKB = fileSize / 1024; // size in KB
        const fileSizeInMB = fileSizeInKB / 1024; // size in MB
        if (fileSizeInMB > fileSizeLimit) {
            // console.log('success check',fileSizeInMB,fileSizeLimit)
            return false;
        }
        // console.log('fail check',fileSizeInMB,fileSizeLimit)
        return true;
    }
}
const fileNameStyle: CSSProperties = {
    color: 'var(--Text, #333F51)',
    fontFamily: 'Segoe-regular',
    fontSize: '12px',
    fontStyle: 'italic',
    fontWeight: 400,
    lineHeight: 'normal',
    textDecorationLine: 'underline',
    textAlign: "right",
    maxWidth: "231px",
    width: "100%"
}
const VideoUpload = ({ onChange, handleError, name, error, value,maxDuration,fileSize }:
    {
        onChange: (arg: string) => void,
        handleError: (arg: applicationQuestionErrorType) => void,
        error: applicationQuestionErrorType,
        name: string,
        value: string,
        maxDuration:number,
        fileSize:number
    }) => {

    const ImageInputRef = useRef<any>(null);
    const [status, setStatus] = useState('ideal')
    const [progress, setProgress] = useState(0)

    const readVideo = async (file: File) => {
        if (!fileSizeValidation(file,fileSize)) {
            //@ts-ignore
            handleError((pre) => {
                return {
                    ...pre, [name]: `File size should not exceed ${fileSize}MB`
                }
            })
            return
        }
        setStatus('uploading')
        const formData=new FormData();
        formData.append('file',file)
        try {

         const videoCheck= await checkVideoSize(formData,maxDuration);
         console.log('video check============',videoCheck)

            if ('error' in videoCheck) {
                // @ts-ignore
                handleError((pre) => {
                    return {
                        ...pre, [name]: videoCheck['error'] ?? 'Video length exceeds the the expectation! Please try again with shorter video.'
                    }
                })
                setStatus('upload fail')
                setProgress(0)
                return
            }

            const apis = await getPreSignApi()
            // @ts-ignore
            const resp2 = await preSignApiCall(apis?.presigned_url, file, file?.type, setProgress)
            if (error?.[name]) {
                //@ts-ignore
                handleError((pre) => {
                    return {
                        ...pre, [name]: ''
                    }
                })
            }
            onChange(apis?.s3_location)
            setStatus('upload success')
            setProgress(0)
        } catch (e:any) {
            console.log(e)
            //@ts-ignore
            handleError((pre) => {
                return {
                    ...pre, [name]: e?.response?.data?.detail ?? 'Upload failed. Please try again.'
                }
            })
            setStatus('upload fail')
            setProgress(0)
        }
    }

    const handleSelectVideoClick = () => {
        ImageInputRef?.current?.click();
    };

    return (
        <div>
            <input
                type="file"
                accept="video/mp4,video/x-m4v"
                ref={ImageInputRef}
                onChange={(event) => {
                    if (event?.target.files && event.target.files.length > 0) {
                        const file = event.target.files[0];
                        const fileType = file.type;
                        console.log(fileType)
                        if (fileType.includes('mp4')) {
                            console.log("Video file selected:", file);
                            readVideo(file);
                            ImageInputRef.current.value = '';
                        } else {
                            toast.error("Invalid file type. Please select a MP4 video file.");
                            // You can provide feedback to the user here, e.g., show an error message.
                            ImageInputRef.current.value = ''; // Clear the input field
                        }
                    }
                }}
                style={{ display: "none" }}
            />
            <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: "center" }} >
                {!error?.[name] && (status === 'upload success' || value) && <span className={styles.uploadedSuccessText}>Uploaded Successfully</span>}
                {error?.[name] && <span className={styles.uploadedFailText}>{error?.[name]}</span>}
                {status === 'uploading' && <PercentageButton progress={progress} isVideoIcon={true} width='220px' />}
                {status !== 'uploading' && <button onClick={handleSelectVideoClick}
                    style={{ padding: "12px 18px", maxWidth: "220px", width: "100%", borderRadius: "8px", background: "#50B089", color: "#fff" }}
                >
                    <span style={{ marginRight: '10px' }}><Image src={videoIcon} alt='icon' /></span>
                    {error?.[name] || value ? 'Re-Upload' : 'Upload your Video'}
                </button>}
            </div>

            {!error?.[name] && value &&
                <div style={{ textAlign: "right", display: "flex", justifyContent: 'flex-end', gap: '5px', paddingTop: "10px" }}>
                    <a href={value} style={fileNameStyle} target='_blank' rel="noreferrer">Uploaded Video </a><FaFileVideo size={16} />
                </div>
            }

        </div>
    )
}

export default VideoUpload