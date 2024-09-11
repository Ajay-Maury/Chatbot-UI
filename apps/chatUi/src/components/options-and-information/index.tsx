import React, { useState } from 'react'
import style from './index.module.css'
import MuiDatePicker from '../../UiComponents/MuiDatePicker';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import StarRating from '../../UiComponents/StarRating';
import { useLocalization } from '../../hooks/useLocatization';
import DateRange from '../../UiComponents/DateRange';


type InformationType = {
    statement: string,
    value: number
}

const RenderOptionAndInformation = (props: any) => {
    const { options, optionType, information, sendMessage, setMessages, setLocale } = props
    console.log('information:', information)
    console.log('optionType:', optionType)
    console.log('options:', options)
    const [inputDate, setInputDate] = useState(new Date())
    const t = useLocalization();

    const handleSend = (text: string) => {
        // sendMessage(text.trim())
        sendMessage(text)

    }

    const handleLanguage = (key: string) => {
        localStorage.setItem('locale', key)
        setLocale(key)
        setMessages([])
    }

    const renderOptions = (option: string, index: number) => {

        // if (option?.option && option?.helperText) {
        //     return <div onClick={() => handleSend(option.option)} style={{ cursor: 'pointer' }}>
        //         <div className={index===0 ? style.option1 :style.option}>{option?.option}</div>
        //         <div className={style.helperText}>{option?.helperText}</div>
        //     </div>
        // } else {
        return <div
            className={index === 0 ? style.optionWithoutBorder : style.optionWithoutHelperText}
            onClick={() => handleSend(option)}
            style={{ cursor: 'pointer' }}
        >
            {option}
        </div>
        // }
    }

    const renderLanguageOptions = (option: { option: string, key: string }, index: number) => {
        return <div
            className={index === 0 ? style.optionWithoutHelperText1 : style.optionWithoutHelperText}
            onClick={() => handleLanguage(option.key)}
            style={{ cursor: 'pointer' }}
        >
            {option.option}
        </div>
    }



    const renderInformation = (value: InformationType, index: number) => {
        return <div
            className={style.statementBoxWithBorder} onClick={() => handleSend(`${value?.statement} of ${value.value}`)}
        >
            <div className={style.statementText}>{value?.statement}</div>
            <div className={style.statementValue} >₹ {value.value}</div>
        </div>
    }

    const renderOptionComponent = (options: string[], optionType: string) => {
        const handleDateSend = () => {
            const newDate = dayjs(inputDate)

            if (newDate.isValid()) {
                handleSend(newDate.format('MM/DD/YYYY'))
            } else {
                toast.error('please enter valid date')
            }
        }

        switch (optionType) {
            case 'date': {
                return <div className={style.dateOptionContainer}>
                    <div className={style.dateHeading} >
                        {t("label.enter_date")}
                    </div>
                    <div className={style.dateFieldContainer}>
                        <MuiDatePicker value={inputDate} onChange={(date) => setInputDate(date)} maxDate={new Date()} />
                    </div>
                    <div className={style.dateButton}>
                        <div onClick={handleDateSend}>{t("label.ok")}</div>
                    </div>
                </div>
            }
            case 'date_range': {
                return <DateRange dateSend={handleSend} />
            }
            case 'option_selection': {
                return <>
                    <div className={style.skipContainer}>
                        <div>Please select any one of the following question you want to answer</div>
                        <div></div>
                    </div>
                    <div className={`${style.optionsBox} ${style.optionTextBorder}`}>
                        {options?.map((option: any, index: number) => {
                            return <div key={option} className={style.optionContainer}>
                                {option && renderOptions(option, index)}
                            </div>
                        })}
                    </div>
                </>
            }
            case 'language_selection': {
                return <div className={style.optionsBox}>
                    {options?.map((option: any, index: number) => {
                        return <div key={option} className={style.optionContainer}>
                            {option && renderLanguageOptions(option, index)}
                        </div>
                    })}
                </div>
            }
            case 'rating': {
                return <div className={style.ratingContainer} >
                    <StarRating
                        size={30}
                        count={5}
                        onChange={(number: number) => {
                            setTimeout(() => {
                                handleSend(number.toString())
                            }, 1000)
                        }} />
                </div>
            }
            default: {
                return null
            }
        }
    }

    return (
        <>
            {information && information?.length > 0 && <div>
                <div className={style.informationContainer}>
                    {information?.map((value: any, index: number) => {
                        return <div key={index} >{renderInformation(value, index)}</div>
                    })}
                </div>
                <div className={style.orText}>Or</div>
            </div>
            }
            < >
                {renderOptionComponent(options, optionType)}
            </>
        </>

    )
}

export default RenderOptionAndInformation