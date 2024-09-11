import React, { useState } from 'react'
import MuiDatePicker from './MuiDatePicker'
import styles from './index.module.css'
import toast from 'react-hot-toast';
import DateSwipIcon from '../assets/icons/dateswipbtn.svg'
import { useLocalization } from '../hooks/useLocatization';
import Image from 'next/image';
import dayjs, { Dayjs } from 'dayjs';

const DateRange = ({ dateSend }: { dateSend: (arg: string) => void }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null)
    const t = useLocalization();

    const handleDateSend = () => {
        if (startDate && endDate) {
            const newStartDate = dayjs(startDate)
            const newDateEndDate = dayjs(endDate)
            dateSend(`${newStartDate.format('MM/DD/YYYY')} - ${newDateEndDate.format('MM/DD/YYYY')}`)

        } else {
            toast.error(t("message.date_range_error"))
        }
    }

    const calculateMaxDate = (selectedStartDate: Dayjs) => {
        const currentDate = dayjs();
        const oneMonthAfter = selectedStartDate.add(1, 'month');
        const oneMonthAfterWithToday = oneMonthAfter.isAfter(currentDate)
            ? currentDate
            : oneMonthAfter;

        return oneMonthAfterWithToday.toDate();
    };

    const handleEndDate = (date: Date) => {
        if (startDate) {
            setEndDate(date)
        } else {
            toast.error(t("label.date_warning"))

        }
    }


    return (
        <div className={styles.dateRangeContainer}>
            <div className={styles.dateHeading}>{t("label.enter_date_range")}</div>
            <div className={styles.dateRangeBox} >
                <MuiDatePicker
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    maxDate={new Date()}
                    placeholder="From Date"
                />
                <div className={styles.swipIcon}>
                    <Image src={DateSwipIcon.src} height={28} width={28} alt='icon' />
                </div>
                <MuiDatePicker
                    value={endDate}
                    onChange={handleEndDate}
                    minDate={startDate}
                    maxDate={calculateMaxDate(dayjs(startDate))}
                    placeholder="To Date"
                />
            </div>
            <div className={styles.dateButton}>
                <div onClick={handleDateSend}>{t("label.ok")}</div>
            </div>
        </div>
    )
}

export default DateRange