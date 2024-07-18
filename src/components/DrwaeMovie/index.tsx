import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { motion } from "framer-motion";
import ShowMovie from '../ShowMovie'
import { Button } from '../ui/button'
import { AiFillStar, AiOutlineClose } from 'react-icons/ai'
import { movieDTO } from '../../DTOs/MovieDTO'


type props = {
    movie: movieDTO,
    onCloseDrawer: Function
}
export default function DrawerMovie({ movie, onCloseDrawer }: props) {
    return (
        <Drawer>
            <DrawerTrigger asChild className='cursor-pointer scale-95 hover:scale-100 transition-all  rounded-xl select-none ' >
                <div className='relative text-white flex flex-col justify-between'>
                    <div className='flex items-center gap-2 absolute -left-1 top-0 bg-black bg-opacity-75 p-1 rounded-xl md:p-2 '>
                        <AiFillStar className='text-yellow-500 text-lg' />
                        <p className=''>
                            {movie.imdbRating}
                        </p>
                    </div>
                    <motion.img animate={{
                        x: 0, opacity: 1, transition: {
                            duration: 0.3,
                            ease: "linear"
                        }
                    }} initial={{ x: 10, opacity: 0 }} className='rounded-xl' src={movie.Poster} alt="Poster" />
                    <h1 className='text-center md:text-lg absolute bottom-0 w-full bg-black bg-opacity-75'>{movie.Title}</h1>
                </div>

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
