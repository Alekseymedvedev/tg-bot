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
    onSave: () => void
    onReset: () => void
}

export const Form: FC<IType> = memo(({children, onSave, onReset}) => {
    return (
        <div className={'container'}>
            <div className={cls.box}>
                <input className={cls.input} type="text" placeholder={'машина'}/>
                <input className={cls.input} type="text" placeholder={'Что делаем'}/>
                <select className={cls.select}>
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
