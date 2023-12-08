import React, {FC, memo, useEffect} from 'react'
import cls from './modal.module.scss'
import { useState } from 'react';
import { createPortal } from 'react-dom';
interface IType {
    children?: any
}

export const Modal: FC<IType> = memo(({children}) => {

    return (
        <div className={cls.modal + ' container'}>
            {children}
        </div>
    );
}) 
