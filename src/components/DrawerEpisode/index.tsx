import { useEffect, useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../ui/drawer'
import ShowMovie from '../ShowMovie'
import { Button } from '../ui/button'
import { AiFillStar, AiOutlineClose } from 'react-icons/ai'
import { movieDTO } from '../../DTOs/MovieDTO'
import { motion } from 'framer-motion'
import { Skeleton } from '../ui/skeleton'


const animate = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3
    }
  },

}

type props = {
  imdbID: string
}
const { VITE_API_OMDB_BASE_URL, VITE_API_KEY } = import.meta.env

export default function DrawerEpisode({ imdbID }: props) {
  const [episode, setEpisode] = useState<movieDTO | any>({})
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    getData()
  }, [])

  return (
    <Drawer>
      {!isLoading && (
        <>
          <DrawerTrigger asChild className='cursor-pointer scale-95 hover:scale-100 h-full transition-all  rounded-xl'>
            <div className='flex flex-col h-[100%] justify-around w-[100%] items-center'>
              <div className='flex items-center gap-2 absolute -left-1 top-0 bg-black bg-opacity-75 p-1 rounded-xl md:p-2 '>
                <AiFillStar className='text-yellow-500 text-lg' />
                <p className=''>
                  {episode.imdbRating}
                </p>
              </div>
              <motion.img variants={animate} initial="hidden" animate="visible" className='rounded-t-xl max-h-[200px] h-auto w-auto' src={episode.Poster} alt="Poster" />
              <div>
                <h1 className='w-full text-center p-0 mt-2'>E{episode.Episode} - {episode.Title}</h1>
                <p className='w-full text-center p-0 m-0'>  {`Duration: ${episode.Runtime}`}</p>
              </div>
            </div>
          </DrawerTrigger>
        </>
      )}
      {isLoading && (
        <div className='block'>
          <Skeleton className='h-20 md:h-36 w-32 md:w-[200px] bg-gray-500 rounded-xl' />
          <Skeleton className='h-3 mt-1 md:w-[180px] mx-auto bg-gray-500 rounded-xl' />
          <Skeleton className='h-3 mt-1 md:w-[200px] mx-auto bg-gray-500 rounded-xl' />
        </div>
      )
      }
      <DrawerContent className='bg-black border-red-900 max-h-[80vh]'>
        <div className="w-full h-full bg-black text-white md:pb-14 z-20 overflow-scroll">
          <ShowMovie movie={episode} />
        </div>
        <DrawerClose asChild className='absolute right-4 top-4 border-none flex z-30  hover:bg-red-600'>
          <Button variant="outline" ><AiOutlineClose className='text-white text-xl drop-shadow-3xl drop-shadow ' /></Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  )
  async function getData() {
    setIsLoading(true)
    await fetch(`${VITE_API_OMDB_BASE_URL}/?i=${imdbID}&plot=full&apikey=${VITE_API_KEY}`, { method: "GET" }).
      then(response => response.json()).then(data => {
        setEpisode(data)
        setIsLoading(false)
      })
  }
}