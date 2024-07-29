import { motion } from "framer-motion";
import { AiFillStar } from 'react-icons/ai'
import { movieDTO } from '../../DTOs/MovieDTO'
import { useNavigate } from "react-router-dom";

type props = {
    movie: movieDTO,
}

export default function CardMovie({ movie }: props) {
  const navigate = useNavigate()

    return (
        <button onClick={() => changeRoute(`details/${movie.imdbID}`)}>
            <div className='cursor-pointer scale-95 hover:scale-100 transition-all  rounded-xl select-none ' >
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
                    <h1 className='text-center hidden md:block md:text-lg absolute bottom-0 w-full bg-black bg-opacity-75 xl:py-4 px-4'>{movie.Title}</h1>
                </div>

            </div>
        </button>
    )
    function changeRoute(route: string) {

        navigate(`/${route}`)
      }
}
