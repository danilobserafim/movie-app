"use client"
import React from 'react'
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../ui/drawer'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel';
import { movieDTO } from '../../DTOs/MovieDTO';
import ShowMovie from '../ShowMovie';
import { Button } from '../ui/button';

type props = {
    data: movieDTO[],
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClose?: Function
    title: string
}

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

export default function CarouselMovie({ data, onClose, title }: props) {
    return (
        <Carousel className=" w-[105%] ml-3  relative " opts={{
            align: "start",
            loop: true,
            watchSlides: true,
            slidesToScroll: 2,
        }}
        >
            <h2 className='w-full pl-4 md:text-5xl text-xl font-bold md:mt-20 text-white md:pl-5 mt-8' >{title}</h2>
            <CarouselContent className=''>

                {data.map((movie, index) => {
                    return (
                        <CarouselItem key={index}
                            className=" md:basis-1/4 lg:basis-1/6 basis-1/3 justify-center items-center flex ">
                            <Drawer>
                                <DrawerTrigger asChild className='cursor-pointer scale-95 hover:scale-100 transition-all  rounded-xl'>
                                    <img className='rounded-xl' src={movie.Poster} alt="Poster" />
                                </DrawerTrigger>
                                <DrawerContent className='bg-black border-red-950 h-full md:h-auto max-h-[100vh]' onCloseAutoFocus={() => onClose && onClose()}>
                                    <div className="w-full text-white md:pb-14 z-20 overflow-scroll max-h-[100vh]">
                                        <ShowMovie movie={movie} />
                                    </div>
                                    <DrawerClose asChild className={`absolute right-4 top-4  z-30 hover:bg-red-600 border-none `}>
                                        <Button variant="outline" ><AiOutlineClose className='text-white text-xl ' /></Button>
                                    </DrawerClose>
                                </DrawerContent>
                            </Drawer>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
            <div className='absolute -top-7 right-[10%] '>
                <CarouselNext className="text-white hover:text-white hidden md:flex border-none" />
                <CarouselPrevious className="text-white hover:text-white hidden md:flex border-none" />

            </div>


        </Carousel>
    )
}
