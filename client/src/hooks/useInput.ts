import React, {useEffect, useMemo, useState} from "react";


export const useInput = (initialValue?: any,errorInput?: (val:boolean)=>void, ) => {
    const [value, setValue] = useState(initialValue)
    // const [error, setError] = useState(false)

    const onChange = (e: any) => {
        setValue(e.target.value)
        if (e.target.value !== '' && errorInput) {
            errorInput(false)
        }
    }

    return {
        value, onChange
    }
}