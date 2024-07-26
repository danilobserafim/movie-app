import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import ShowMovie from '../../components/ShowMovie'
import AcordeonSeasons from '../../components/AcordeonSeasons'
import { movieDTO } from '../../DTOs/MovieDTO'
import Spinner from '../../components/Spinner'

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
            {
                movie ? <div className="py-8">
                    <ShowMovie movie={movie} />
                    {
                        movie.TotalSeasons && <div className='w-full lg:w-[45%] lg:flex-wrap pt-10 md:h-[85vh] px-4 lg:mx-auto md:overflow-scroll'>
                            <AcordeonSeasons imdbID={movie.imdbID} totalSeasons={movie.totalSeasons} />
                        </div>
                    }
                </div> : <div className='h-96 flex justify-center items-center'>
                    <Spinner className='h-10' />

                </div>
            }
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
