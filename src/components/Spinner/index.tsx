import { motion } from "framer-motion";

type props = {
  className: string
}
export default function Spinner({ className }: props) {
  return (

    <motion.div
      className={`aspect-video border-4 rounded-full flex justify-center items-center ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        delay: 0,
      }}
    >
      <motion.div animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          delay: 0,
        }} className='w-[110%] h-[110%] rotate-45 bg-white rounded-3xl'>
      </motion.div>
    </motion.div>
  )
}
