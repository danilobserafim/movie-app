import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import ShowMovie from '../../components/ShowMovie'
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
            {movie ?
                <div className="py-8">
                    <ShowMovie movie={movie} />
                </div> :
                <div className='h-96 flex justify-center items-center'>
                    <Spinner className='h-10' />
                </div>}
        </>
    )
    async function SearchMovieData() {
        await fetch(`https://www.omdbapi.com/?i=${dataSearch}&apikey=${apiKey}&plot=full`).
            then(response => response.json()).
            then((data: movieDTO) => {
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
