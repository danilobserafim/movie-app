import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { motion } from "framer-motion";
import ShowMovie from '../ShowMovie'
import { Button } from '../ui/button'
import { AiOutlineClose } from 'react-icons/ai'
import { movieDTO } from '../../DTOs/MovieDTO'


type props = {
    movie: movieDTO,
    onCloseDrawer: Function
}
export default function DrawerMovie({ movie, onCloseDrawer }: props) {
    return (
        <Drawer>

            <DrawerTrigger asChild className='cursor-pointer scale-95 hover:scale-100 transition-all  rounded-xl' >
                <motion.img animate={{x:0, opacity:1, transition:{
                    duration: 0.3,
                    ease: "linear"
                }}} initial={{x:10, opacity:0}} className='rounded-xl' src={movie.Poster} alt="Poster" />
            </DrawerTrigger>

            <DrawerContent className='bg-black border-none h-full md:h-auto max-h-[100vh]' onCloseAutoFocus={() => onCloseDrawer && onCloseDrawer()}>

                <div className="w-full text-white md:pb-14 z-20 overflow-scroll max-h-[100vh]">
                    <ShowMovie movie={movie} />
                </div>

                <DrawerClose asChild className={`absolute right-4 top-4  z-30 hover:bg-red-600 border-none `} >
                    <Button variant="outline" ><AiOutlineClose className='text-white text-xl ' /></Button>
                </DrawerClose>

            </DrawerContent>
        </Drawer>
    )
}
