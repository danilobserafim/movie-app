import React from 'react'
import { motion } from "framer-motion";

export default function Spinner() {
  return (

<motion.div
className='h-24 w-24 border-4 rounded-full flex justify-center items-center'
animate={{ rotate: 360}}
transition={{
  repeat: Infinity,
  duration:1,
  delay:0
}}
>
    <div className='w-[95%] h-[95%] bg-black rounded-3xl'>

    </div>
</motion.div>
  )
}
