import React from "react";

interface InputProps {
    type?: "text" | "password";
    placeholder: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ type = "text", placeholder, value, onChange }) => {
    return(
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    );
};

export default Input;
