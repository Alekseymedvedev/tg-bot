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
]

interface IType {
    children?: any
    onSave?: () => void
    onReset?: () => void
    inputCar?: {}
    inputWork?: {}
    selectTime?: {}
}

export const Form: FC<IType> = memo(({children, onSave, onReset,inputCar,inputWork,selectTime}) => {
    return (
        <div>
            <div className={cls.box}>
                <input className={cls.input} {...inputCar} type="text" placeholder={'машина'}/>
                <input className={cls.input} {...inputWork} type="text" placeholder={'Что делаем'}/>
                <select className={cls.select} {...selectTime}>
                    {
                        time.map(item =>
                            <option key={item} value={item}>{item}</option>
                        )
                    }
                </select>
            </div>
            <button onClick={onReset}>Отменить</button>
            <button onClick={onSave}>Сохранить</button>
        </div>
    )
}) 
