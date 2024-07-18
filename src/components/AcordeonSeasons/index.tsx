import { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { motion } from 'framer-motion'
import { SeasonDTO } from '../../DTOs/SeasonDTO'
import DrawerEpisode from '../DrawerEpisode'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import Spinner from '../Spinner'


type props = {
    imdbID: string,
    totalSeasons: string

}
const { VITE_API_OMDB_BASE_URL, VITE_API_KEY } = import.meta.env
export default function AcordeonSeasons({ imdbID, totalSeasons }: props) {
    const [seasonsData, setSeasonsData] = useState<SeasonDTO[]>([])

    useEffect(() => {
        getSeasons()
    }, [imdbID])

    return (
        <>
            {(!seasonsData[0] && totalSeasons !== "N/A") && <div className='mb-10'> <h1 className='w-full text-center mb-10'>Carregando temporadas</h1><Spinner className='w-10 md:w-20 mx-auto' /></div>}
            {seasonsData && seasonsData.map((seasonData, index) => {
                return (
                    <motion.div animate={{ y: 0 }} initial={{ y: 20 }} >
                        <Accordion type="multiple" className="text-white max-w-[1200px] mx-auto" key={index}>
                            <AccordionItem value={`item-${index}`}>
                                <AccordionTrigger className=''>{index + 1}ª temporada</AccordionTrigger>
                                <AccordionContent>
                                    <Carousel className='w-[110%]' opts={{
                                        align: "start",
                                        loop: true,
                                        watchSlides: true,
                                        slidesToScroll: 2,
                                    }}>
                                        <CarouselContent>
                                            {seasonData?.Episodes.map((episode, i) => {
                                                return (
                                                    <CarouselItem key={i}
                                                        className=" md:basis-1/6 basis-1/3 justify-center items-center flex">
                                                        <DrawerEpisode imdbID={episode.imdbID} />
                                                    </CarouselItem>
                                                )

                                            })}
                                        </CarouselContent>
                                    </Carousel>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </motion.div>
                )
            })}
        </>
    )
    async function getSeasons() {
        let dataMovie: SeasonDTO[] = []
        for (let index = 0; index < Number.parseInt(totalSeasons); index++) {
            await fetch(`${VITE_API_OMDB_BASE_URL}/?i=${imdbID}&plot=full&apikey=${VITE_API_KEY}&season=${index + 1}`, { method: "GET" }).
                then(response => response.json()).
                then((data) => {
                    if (data) {
                        dataMovie.push(data)
                    }
                }).
                catch(() => console.log(`Erro na busca da ª temporada!`))
        }
        setSeasonsData(dataMovie)
    }

}
