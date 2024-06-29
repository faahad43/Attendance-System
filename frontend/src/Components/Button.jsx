import React from 'react'


const Button = ({name,icon='',className,type="button",onClick=()=>{}}) => {
  return (
    <>
        <button type={type} className={`${className} text-white  focus:outline-none focus:ring-1 focus:ring-white font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green dark:hover:bg-darkgreen dark:focus:ring-white flex items-center justify-center  gap-1`} onClick={onClick}>{icon}{name}</button>
    </>
  )
}

export default Button
