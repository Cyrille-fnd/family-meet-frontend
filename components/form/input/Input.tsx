import s from "./input.module.css"
import React from "react";

export interface InputProps {
    name: string
    type?: string
    placeholder: string
}

const Input: React.FC<InputProps>
    = ({
    name,
    type = "text",
    placeholder
}) => {
    return (
        <input name={name} type={type} placeholder={placeholder} className={s.input}/>
    )
}

export default Input
