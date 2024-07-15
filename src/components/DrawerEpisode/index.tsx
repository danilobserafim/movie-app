import React, { useEffect, useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../ui/drawer'
import ShowMovie from '../ShowMovie'
import { Button } from '../ui/button'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { movieDTO } from '../../DTOs/MovieDTO'
import { delay, motion } from 'framer-motion'
import { Skeleton } from '../ui/skeleton'


const animate = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale:1,
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
          <DrawerTrigger asChild className='cursor-pointer scale-95 hover:scale-100 transition-all  rounded-xl'>
            <div className='flex flex-col h-[100%] justify-around w-[100%] items-center'>
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
        <Skeleton className='h-20 md:h-36 w-[200px] bg-gray-500 rounded-xl' />
      )
      }
      <DrawerContent className='bg-black border-red-950 h-full'>
        <div className="w-full  bg-black text-white md:pb-14 z-20 overflow-scroll">
          <ShowMovie movie={episode} />
        </div>
        <DrawerClose asChild className='absolute left-4 top-[80px] md:flex hidden z-30  hover:bg-black'>
          <Button variant="outline" ><AiOutlineArrowLeft className='text-white text-xl ' /></Button>
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