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


export const Day: FC<IType> = memo(({data, date, day}) => {
    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState(false)
    const [validateDelete, setValidateDelete] = useState(-1)
    const [validateEdit, setValidateEdit] = useState(false)
    const [visibleText, setVisibleText] = useState(-1)
    const inputCar = useInput('', setError)
    const inputWork = useInput('', setError)
    const selectTime = useSelect()
    // useEffect(()=>{
    //     setError()
    // },[inputCar,inputWork])
    const saveHandler = async () => {
        const data = {
            date,
            time: selectTime.value,
            car: inputCar.value,
            text: inputWork.value
        }
        console.log(selectTime.value)
        if (inputCar.value !== '' && selectTime.value !== '') {
            await axios.post(`${process.env.REACT_APP_URL}/record`, data)
                .then(() => setOpenModal(false))
        } else {
            setError(true)
        }
    }
    const updateHandler = async (id: number) => {
        const data = {
            date,
            time: selectTime.value,
            car: inputCar.value,
            text: inputWork.value
        }
        await axios.patch(`${process.env.REACT_APP_URL}/record/${id}`, data)
            .then(() => {
                setOpenModal(false)
                setValidateEdit(false)
            })
    }
    const deleteHandler = async (id: number) => {
        await axios.delete(`${process.env.REACT_APP_URL}/record/${id}`)
            .then(() => {
                setValidateDelete(-1)
                setOpenModal(false)
            })
    }
    const recordHandler = async (id: any) => {
        setOpenModal(true)
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
                        data && data?.filter((item: any) => item?.date === date).length > 0 ?
                            data?.filter((item: any) => item?.date === date).map((item: any, index: number) =>
                                <div key={item.id} className={cls.box}>
                                    {
                                        visibleText === index &&
                                        <div className={cls.text}>
                                            <span className={cls.close} onClick={() => setVisibleText(-1)}>X</span>
                                            {item.text}
                                        </div>
                                    }

                                    <div className={cls.car} onClick={() => setVisibleText(index)}>
                                        <div>{item.date}</div>
                                        <div>&nbsp;{item.car}&nbsp;</div>
                                        <div>в&nbsp;{item.time}</div>
                                    </div>
                                    <div className={cls.boxBtn}>
                                        <button onClick={() => setValidateEdit(true)}>
                                            <img src={editIcon} alt="Редактировать"/>
                                        </button>
                                        <button onClick={() => setValidateDelete(index)}>
                                            <img src={deleteIcon} alt="Удалить"/>
                                        </button>

                                       {
                                            validateEdit &&
                                            <div className={cls.text}>
                                                <span className={cls.close} onClick={() => setValidateEdit(false)}>X</span>
                                                <div>Точно?</div>
                                                <button onClick={() => updateHandler(item.id)}>
                                                    Сохранить
                                                </button>
                                            </div>
                                        }
                                         {
                                            validateDelete === index &&
                                            <div className={cls.text}>
                                                <span className={cls.close} onClick={() => setValidateDelete(-1)}>X</span>
                                                <div>Точно?</div>
                                                <button onClick={() => deleteHandler(item.id)}>
                                                    Удалить
                                                </button>
                                            </div>
                                        }
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
                        error={error}
                    />

                </Modal>, document.body
            )}
        </div>
    );
})
