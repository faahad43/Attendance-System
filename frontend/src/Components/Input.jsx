import React from 'react'

const Input = ({label,name,value,onChange,type="text",disabled}) => {
    
    return (
      <div className="relative z-0 w-full">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={ onChange}
          className={`peer block py-2.5 px-1 w-[17.5rem] text-sm text-lightgrey bg-transparent border-0 border-b-[2px] appearance-none focus:outline-none focus:ring-0 focus:border-green ${
            disabled ? "border-gray-300" : "border-lightgrey"
          }`}
          placeholder=" "
          disabled={disabled}
        />
        <label
          htmlFor={name}
          className="peer-focus:font-medium absolute text-sm text-lightgrey duration-300 transform -translate-y-5 scale-80 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:-translate-y-5"
        >
          {label}
        </label>
      </div>
    );
}

export default Input