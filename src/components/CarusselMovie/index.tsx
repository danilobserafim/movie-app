"use client"
import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '../../components/ui/drawer'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../../components/ui/carousel';
import { movieDTO } from '../../pages/SearchPage/DTO';
import ShowMovie from '../ShowMovie';
import { Button } from '../ui/button';

type props = {
    data: movieDTO[],
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClose?: Function
}


export default function CarouselMovie({ data, onClose }: props) {
    return (
        <Carousel className=" w-[105%] ml-3  relative " opts={{
            align: "start",
            loop: true,
            watchSlides: true,
            slidesToScroll: 2,
        }}
        >
            <CarouselContent className=''>
                {data.map((movie, index) => {
                    return (
                        <CarouselItem key={index}
                            className=" md:basis-1/4 lg:basis-1/6 basis-1/3">
                            <Drawer>
                                <DrawerTrigger asChild className='cursor-pointer scale-95 hover:scale-100 transition-all  rounded-xl'>
                                        <img className='rounded-xl  ' src={movie.Poster} alt="Poster" />
                                </DrawerTrigger>
                                <DrawerContent className='bg-black border-red-950' onCloseAutoFocus={() => onClose && onClose()}>
                                    <div className="w-full h-full bg-black text-white md:pb-14 flex flex-col items-center justify-center ">
                                        <ShowMovie movie={movie} />
                                    </div>
                                        <DrawerClose asChild className='absolute left-4 top-[100px] bg-gray-800 z-30 md:hidden hover:bg-black'>
                                            <Button variant="outline" ><AiOutlineArrowLeft className='text-white text-lg ' /></Button>
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
