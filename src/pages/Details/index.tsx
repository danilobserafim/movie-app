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
            <div className="flex p-8">

                {movie && <ShowMovie movie={movie} />}
            <div className='float-left w-[50%] mt-10'>
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
