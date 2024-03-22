import React from 'react'

interface ButtonProps {
    type: "submit" | "reset" | "button",
    title: string,
    disabled?: boolean,
    styles?: string,
}

const Button = ({ type, title, disabled, styles }: ButtonProps) => {
    return (
        <button disabled={disabled} type={type} className={`${styles} bg-black rounded-[6px] text-white px-[148px] py-[18px] text-[16px] font-medium text-center tracking-wider uppercase`}>
            {title}
        </button>
    )
}

export default Button
