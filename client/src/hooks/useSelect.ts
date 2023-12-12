import  {useEffect, useState} from "react";



export const useSelect = () => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState(false)

    const onChange = (e:any) => {
        setValue(e.target.value);
        if (e.target.value !== '') {
            setError(false)
        }
    }

    return {
        value,error, onChange
    }
}