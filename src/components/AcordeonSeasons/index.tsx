import React, { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { SeasonDTO } from '../../DTOs/SeasonDTO'


type props = {
    imdbID: string,
    totalSeasons: string

}
const {VITE_API_OMDB_BASE_URL, VITE_API_KEY} = import.meta.env
export default function AcordeonSeasons({ imdbID, totalSeasons }: props) {
    const [seasonsData, setSeasonsData] = useState<SeasonDTO[]>([])

    useEffect(() => {
        getSeasons()
    }, [imdbID])

    return (
        <>
            {seasonsData.map((seasonData, index) => {
                return (
                    <Accordion type="multiple"  className="text-white max-w-[1000px] mx-auto flex-col" key={index}>
                        <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger className=''>{index + 1}ª temporada</AccordionTrigger><AccordionContent>
                                {seasonData?.Episodes.map(episode => {
                                    return <h1>{episode.Title}</h1>
                                })}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )
            })}
        </>
    )
    async function getSeasons() {
        for (let index = 0; index < Number.parseInt(totalSeasons); index++) {
            await fetch(`${VITE_API_OMDB_BASE_URL}/?i=${imdbID}&plot=full&apikey=${VITE_API_KEY}&season=${index + 1}`,{method:"GET"}).
                then(response => response.json()).
                then((data) => {
                    if (data) {
                        if (!seasonsData.some(season=> season.Season == data.Season)) {
                            setSeasonsData(prev => [...prev, data])
                        }
                    }
                }).
                catch(() => console.log(`Erro na busca da ª temporada!`))
        }
    }

}
