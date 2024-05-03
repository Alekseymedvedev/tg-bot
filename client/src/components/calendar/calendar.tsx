import React, {FC, memo, useEffect, useState} from 'react'
import cls from './calendar.module.scss'
import {Modal} from "../modal/modal";
import {createPortal} from "react-dom";
import {Form} from "../form/form";
import axios from "axios";
import {Day} from "../day/day";

export interface IData {
    id:number
    car: string
    time: string
    date: string
    text: string
}
const date = new Date()
const weekday = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

export const Calendar = () => {
    const [data, setData] = useState<IData[]>([])
    const [countDays, setCountDays] = useState(0)
    const [currentMonth, setCurrentMonth] = useState(0)
    const [currentYear, setCurrentYear] = useState(2024)
    const [arrDays, setArrDays] = useState<number[]>([])
    const weekdayFirstDay = new Date(currentYear, currentMonth, 1).toLocaleDateString('ru-RU', {weekday: 'short'});

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/record`)
            setData(response.data)
        } catch (e: any) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        setCurrentMonth(date.getMonth())
    }, [])
    useEffect(() => {
        const arr = []
        const indexFirstDay = weekday.findIndex(item => item === weekdayFirstDay)
        if (indexFirstDay > 0) {
            for (let i = 0; i < indexFirstDay - 1; i++) {
                arr.push(0)
            }
        }
        for (let i = 0; i < countDays + 1; i++) {
            arr.push(i)
        }
        setArrDays(arr)
        setCountDays(new Date(currentYear, currentMonth + 1, 0).getDate())
    }, [countDays, currentMonth])
    const nextMonthHandler = () => {
        if (currentMonth < 11) {
            setCurrentMonth(currentMonth + 1)
        } else {
            setCurrentYear(2024)
            setCurrentMonth(0)
        }
    }
    const prevMonthHandler = () => {
        if (currentMonth > 0) setCurrentMonth(currentMonth - 1)
    }

    return (
        <>
            <div className={cls.box}>
                <button onClick={prevMonthHandler}>пред</button>
                <div className="">{months[currentMonth]}</div>
                <button onClick={nextMonthHandler}>след</button>
            </div>
            <div className={cls.calendar}>
                {
                    weekday.map(item => <div key={item}>{item}</div>)
                }
                {
                    arrDays.map((item,index:number) =>
                        <Day key={item+index} data={data} date={`${item}.${currentMonth+1}.${currentYear}`} day={item}/>
                    )
                }
            </div>

        </>
    )
}
