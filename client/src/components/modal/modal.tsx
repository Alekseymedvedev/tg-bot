import React, {FC, memo, useEffect} from 'react'
import cls from './modal.module.scss'
import { useState } from 'react';
import { createPortal } from 'react-dom';
interface IType {
    children?: any
    open?: any
    setOpen?: any
}

export const Modal: FC<IType> = memo(({children,open,setOpen}) => {
    const [showModal, setShowModal] = useState(false);
    useEffect(()=>{
        setShowModal(open)
    },[open,setOpen])
    return (
        <>
            <button onClick={() => setShowModal(true)}>
                Show modal using a portal
            </button>

        </>
    );
}) 
