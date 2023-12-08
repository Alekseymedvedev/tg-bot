import  {useEffect, useState} from "react";



export const useSelect = () => {
    const [value, setValue] = useState<string>('')


    const onChange = (e:any) => {
        setValue(e.target.value);
    }

    return {
        value, onChange
    }
}