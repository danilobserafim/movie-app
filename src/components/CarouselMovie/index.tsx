import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '../ui/carousel';
import { movieDTO } from '../../DTOs/MovieDTO';
import CardMovie from "../CardMovie";

type props = {
    data: movieDTO[],
    // eslint-disable-next-line @typescript-eslint/ban-types
    onCloseDrwaer?: Function
    title: string
}


export default function CarouselMovie({ data, title }: props) {
    return (
        <Carousel className=" w-[105%] ml-3  relative transition-transform" opts={{
            align: "start",
            loop: true,
            watchSlides: true,
            slidesToScroll: 1,
        }}
        >
            <h2 className='w-full pl-1 md:text-5xl text-xl font-bold md:mt-20 text-white md:pl-5 md:my-8 mt-5 mb-1' >{title}</h2>
            <CarouselContent className=''>

                {data.map((movie, index) => {
                    return (
                        <CarouselItem key={index}
                            className=" md:basis-1/4 lg:basis-1/6 basis-1/3 justify-center items-center flex ">
                            <CardMovie movie={movie} />
                        </CarouselItem>
                    )

                })}
            </CarouselContent>
            <div className='absolute top-5 right-[10%] '>
                <CarouselNext className="text-white hover:text-white hidden md:flex border-none" />
                <CarouselPrevious className="text-white hover:text-white hidden md:flex border-none" />

            </div>


        </Carousel>
    )

}
