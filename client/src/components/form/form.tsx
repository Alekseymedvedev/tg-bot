import React, {FC, memo} from 'react'
import cls from './form.module.scss'


const time = [
    '9.00',
    '9.30',
    '10.00',
    '10.30',
    '11.00',
    '11.30',
    '12.00',
    '12.30',
    '13.00',
    '13.30',
    '14.00',
    '14.30',
    '15.00',
    '15.30',
    '16.00',
    '16.30',
    '17.00',
    '17.30',
    '18.00',
    '18.30',
    '19.00',
]

interface IType {
    onSave?: () => void
    onReset?: () => void
    inputCar: {
        value: any
        onChange: (e: any) => void
    }
    inputWork: {
        value: any
        onChange: (e: any) => void
    }
    selectTime: {
        value: any
        onChange: (e: any) => void
    }
    error: boolean
}

export const Form: FC<IType> = memo(({ onSave, onReset, inputCar, inputWork, selectTime, error}) => {
    return (
        <div>
            <div className={cls.box}>
                <input className={cls.input} value={inputCar.value} onChange={inputCar.onChange} type="text"
                       placeholder={'машина'}/>
                <input className={cls.input} value={inputWork.value} onChange={inputWork.onChange} type="text"
                       placeholder={'Что делаем'}/>
                <select className={cls.select} value={selectTime.value} onChange={selectTime.onChange}>
                    <option>выберите время</option>
                    {
                        time.map(item =>
                            <option key={item} value={item}>{item}</option>
                        )
                    }
                </select>
            </div>
            {
                (error) && <div className={cls.error}>нужно хотя бы выбрать время и машину</div>
            }
            <div className={cls.boxBtn}>
                <button onClick={onReset}>Отменить</button>
                <button onClick={onSave}>Сохранить</button>
            </div>
        </div>
    )
}) 
