"use client"
import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai";
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
                                <DrawerContent className='bg-black border-red-950 h-full' onCloseAutoFocus={() => onClose && onClose()}>
                                    <div className="w-full  bg-black text-white md:pb-14 z-20 overflow-scroll">
                                        <ShowMovie movie={movie} />
                                    </div>
                                        <DrawerClose asChild className='absolute left-4 top-[80px] md:flex hidden z-30  hover:bg-black'>
                                            <Button variant="outline" ><AiOutlineArrowLeft className='text-white text-xl ' /></Button>
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
