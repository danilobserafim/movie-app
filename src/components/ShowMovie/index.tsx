import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { movieDTO } from '../../pages/SearchPage/DTO'
import { toast } from 'sonner';
import { motion } from 'framer-motion';

type Props = {
    movie: movieDTO
}

const animate = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
}

export default function ShowMovie({ movie }: Props) {
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        verifyMovieIsLiked()
    }, [movie])
    return (
        <motion.div variants={animate} initial="hidden" animate="visible"
            className=' overflow-y-scroll h-[100vh] w-[100%] mx-auto flex gap-8 relative flex-wrap z-40 p-4
                md:mt-8 md:flex-nowrap  md:h-auto md:overflow-hidden 
                lg:w-[1000px] 
         '
            onDoubleClick={LikeMovie} >
            <Button onClick={LikeMovie} variant={'ghost'} className='absolute right-2 top-20 text-2xl z-20 md:top-0'>{liked ? "❤" : "🤍"}</Button>
            <img src={movie.Poster} alt="" className='w-[100vw] z-10 md:h-[100%] md:w-auto' />
            <div className='sm:px-8 '>
                <h1 className='text-2xl font-bold mb-4 mt-[-8px]'>{movie.Title}</h1>
                <p className='text-gray-500 font-semibold text-md'>
                    {movie.Plot}
                </p>
                <p className='mt-8'><b>Director:</b> {movie.Director}</p>
                <p><b>Writed by:</b> {movie.Writer}</p>
                <p><b>Actors: </b>{movie.Actors}</p>
                {movie.Awards != 'N/A' && <p><b>Awards: </b>{movie.Awards}</p>}
                <p><b>Country: </b>{movie.Country}</p>
                <p><b>Released: </b>{movie.Released}</p>
                <p><b>Duration: </b>{movie.Runtime}</p>
                <p><b>Language: </b>{movie.Language}</p>
                <p><b>Type: </b>{movie.Type}</p>

                {movie.totalSeasons && <p><b>Total seasons: </b>{movie.totalSeasons}</p>}
                <div className='md:absolute md:bottom-0 md:right-0 bg-gray-900 text-white p-3 rounded-xl mt-4 md:mt-auto'>
                    <p><b>imdb Rating: </b>{movie.imdbRating}</p>
                    {movie.Ratings.map((rating) => {
                        return (
                            <div className='w-full'>
                                <h3 ><span className='font-bold '>{rating.Source}: </span>{rating.Value}</h3>
                            </div>
                        )
                    })}
                </div>
                <div className="flex gap-1 mt-8 ">
                    {movie.Genre && movie.Genre.split(", ").map((gen: string) => <Badge className='bg-gray-600 text-white hover:bg-gray-950'>{gen}</Badge>)}
                </div>
            </div>

        </motion.div>
    )

    async function LikeMovie() {
        await fetch(`http://localhost:3333/movies`, {
            method: "POST", body: JSON.stringify(movie), headers: {
                "Content-Type": "application/json"
            }
        }).
            then(response => response.json()).
            then(async () => {
                await liked ? setLiked(false) : setLiked(true)
                !liked ? toast(`❤ ${movie.Title}`, { description: "Conteudo adicionado a sues favoritos" }) : toast(`🤍 ${movie.Title}`, { description: "Conteudo removido dos seus favoritos" })

            }).
            catch(() => {
                toast("Algo deu errado", { description: "Verifique sua conexão" });
            })
    }
    async function verifyMovieIsLiked() {
        await fetch(`http://localhost:3333/movies/${movie.imdbID}`).then(response => response.json()).then(data => {
            data ? setLiked(true) : setLiked(false)

        })
    }
}
