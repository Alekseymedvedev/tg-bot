import React, {FC, memo, useEffect, useState} from 'react'
import cls from './day.module.scss'
import axios from "axios";
import {createPortal} from "react-dom";
import {Modal} from "../modal/modal";
import {Form} from "../form/form";
import {useInput} from "../../hooks/useInput";
import {useSelect} from "../../hooks/useSelect";

interface IType {
    day?: any
    date?: any
}

interface IData {
    car: string
    time: string
    date: string
}

export const Day: FC<IType> = memo(({date, day}) => {
    const [openModal, setOpenModal] = useState(false)
    const [data, setData] = useState<IData[]>([])
    const inputCar = useInput('')
    const inputWork = useInput('')
    const selectTime = useSelect()
    // console.log(data?.find((item: any) => item?.date === date)?.car)
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/record/')
            setData(response.data)
        } catch (e: any) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const saveHandler = async () => {
        const data = {
            date,
            time: selectTime.value,
            car: inputCar.value,
            text: inputWork.value,
        }
        await axios.post('http://localhost:5000/api/record', data)
    }
    const recordHandler = async (id: any) => {
        setOpenModal(true)
        // try {
        //     const response = await axios.get(`http://localhost:5000/api/record/${id}`)
        //     setData(response.data)
        // } catch (e: any) {
        //     console.log(e)
        // }
    }

    return (
        <div>
            <button className={data?.find((item: any) => item?.date === date) ? cls.completed + ' ' + cls.btn : cls.btn}
                    onClick={recordHandler}>
                {day !== 0 ? day : ''}
            </button>
            {openModal && createPortal(
                <Modal>
                    {
                        data && data?.find((item: any) => item?.date === date) ?
                            <div className={cls.box}>
                                <div className={cls.box}>{data?.find(item => item?.date === date)?.date}</div>
                                <div className={cls.box}>предет {data?.find(item => item?.date === date)?.car} </div>
                                <div className={cls.box}>в {data?.find(item => item?.date === date)?.time}</div>
                            </div>
                            : null
                    }
                    <Form
                        selectTime={selectTime}
                        inputWork={inputWork}
                        inputCar={inputCar}
                        onSave={saveHandler}
                        onReset={() => setOpenModal(false)}
                    />
                </Modal>, document.body
            )}
        </div>
    );
})
