import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import ShowMovie from '../../components/ShowMovie'
import AcordeonSeasons from '../../components/AcordeonSeasons'
import { movieDTO } from '../../DTOs/MovieDTO'

export default function Details() {
    const [movie, setMovie] = useState<movieDTO | any>()
    const apiKey = import.meta.env.VITE_API_KEY
    const { dataSearch } = useParams()

    useEffect(() => {
        SearchMovieData()
    }, [dataSearch])
    return (
        <>
            <Header />
            <div className="py-8 xl:flex">
                {movie && <ShowMovie movie={movie} />}
                <div className='w-full lg:w-[45%] lg:flex-wrap pt-10 md:h-[85vh] px-4 lg:mx-auto md:overflow-scroll'>
                    {movie && <AcordeonSeasons imdbID={movie.imdbID} totalSeasons={movie.totalSeasons} />}
                </div>
            </div>
        </>
    )
    async function SearchMovieData() {
        await fetch(`https://www.omdbapi.com/?i=${dataSearch}&apikey=${apiKey}&plot=full`).
            then(response => response.json()).
            then(async (data: movieDTO) => {
                data.Title && setMovie(data)
            }).
            catch(() => {
                ClearMovie()
            })
    }
    function ClearMovie() {
        setMovie(null)
    }
}
