import React, {FC, memo, useEffect, useState} from 'react'
import cls from './day.module.scss'
import axios from "axios";
import {createPortal} from "react-dom";
import {Modal} from "../modal/modal";
import {Form} from "../form/form";
import {useInput} from "../../hooks/useInput";
import {useSelect} from "../../hooks/useSelect";
import deleteIcon from "../../images/delete-svgrepo-com.svg";
import editIcon from "../../images/edit-svgrepo-com.svg";
import {IData} from "../calendar/calendar";

interface IType {
    day?: any
    date?: any
    data: IData[]
}



export const Day: FC<IType> = memo(({data,date, day}) => {
    const [openModal, setOpenModal] = useState(false)
    const inputCar = useInput('')
    const inputWork = useInput('')
    const selectTime = useSelect()
     console.log(data?.filter((item: any) => item?.date === date))


    const saveHandler = async () => {
        const data = {
            date,
            time: selectTime.value,
            car: inputCar.value,
            text: inputWork.value,
        }
        await axios.post(`${process.env.REACT_APP_URL}/record`, data)
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
                        data && data?.filter((item: any) => item?.date === date) ?
                                data?.filter((item: any) => item?.date === date).map((item:any)=>
                                <div className={cls.box}>
                                    <div className={cls.car}>
                                        <div>{item.date}</div>
                                        <div>&nbsp;{item.car}&nbsp;</div>
                                        <div>в&nbsp;{item.time}</div>
                                    </div>
                                    <div className={cls.boxBtn}>
                                        <button>
                                            <img src={editIcon} alt="Редактировать"/>
                                        </button>
                                        <button>
                                            <img src={deleteIcon} alt="Удалить"/>
                                        </button>
                                    </div>
                                </div>
                            )

                            : <div>Запись на этот день пока отсутствует</div>
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
