import React from 'react';

interface ButtonProps {
    text: string;
    type?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({text, type = "button", onClick, disabled = false}) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
 };

 export default Button;