import React, { useEffect, useState } from 'react'
import { movieDTO } from '../../DTOs/MovieDTO'
import ShowMovie from '../../components/ShowMovie'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'
import Spinner from '../../components/Spinner';
import Footer from '../../components/Footer'

export default function SearchPage() {
    const [movie, setMovie] = useState<movieDTO | null>()
    const [isLoading, setIsLoading] = useState(false)
    const { dataSearch } = useParams()
    const apiKey = import.meta.env.VITE_API_KEY

    useEffect(() => {
        SubmitSearchMovie()
    }, [])
    useEffect(() => {
        SubmitSearchMovie()
    }, [dataSearch])

    return (
        <div className='pb-16 text-white min-h-[100vh]'>
            <Header />
            {isLoading && <div className='flex justify-center h-[80vh] items-center'><Spinner className="w-20" /></div>}
            {!movie && !isLoading && (<div>
                    <h1 className='text-3xl mt-10 text-center'>Titulo não encontrado</h1>
                    <p className='text-xl  text-center'>Verifique sua busca</p>
                </div>)}
                {movie && !isLoading && (<ShowMovie movie={movie} />)}
                <Footer />
        </div>
    )

    async function SubmitSearchMovie() {
        setIsLoading(true)
        await fetch(`https://www.omdbapi.com/?t=${dataSearch}&apikey=${apiKey}&plot=full`).
            then(response => response.json()).
            then(async (data) => {
                setIsLoading(false)
                data.Title ? setMovie(data) : setMovie(null)
            }).
            catch(() => {
                ClearMovie()
            })
    }
    function ClearMovie() {
        setMovie(null)
    }
}
