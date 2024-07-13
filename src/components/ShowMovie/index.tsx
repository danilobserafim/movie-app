import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { movieDTO } from '../../DTOs/MovieDTO'
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { AiFillCheckCircle } from 'react-icons/ai';
import AcordeonSeasons from '../AcordeonSeasons';

const baseURL = import.meta.env.VITE_API_BASE_URL

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
const animateLike = {
    hidden: { opacity: 0 },
    visible: {

        opacity: 1
    }
}


export default function ShowMovie({ movie }: Props) {

    const [liked, setLiked] = useState(false)
    useEffect(() => {
        verifyMovieIsLiked()
    }, [movie])
    return (<>
        <motion.div variants={animate} initial="hidden" animate="visible"
            className=' w-[100%] mx-auto flex gap-8 relative flex-wrap z-40 p-4 text-white
                md:mt-8 md:flex-nowrap  md:h-min md:overflow-hidden 
                lg:w-[1000px]'
        >
            <img src={movie.Poster} alt="" className='w-[100vw] z-10 md:h-[100%] md:w-auto' />
            <div className='sm:px-8 '>
                <div className='flex justify-between items-center  mb-4 mt-[-8px]'>
                    <h1 className='text-2xl font-bold'>{movie.Title}</h1>
                    {movie.Type !== "episode" &&<Button onClick={LikeMovie} variant={'ghost'} className='active:scale-90  text-2xl z-20'>{liked ?
                        (<motion.div variants={animateLike} animate="visible" initial="hidden"><AiFillCheckCircle className='text-green-500' /></motion.div>) :
                        (<motion.div variants={animateLike} animate="visible" initial="hidden"><AiFillCheckCircle /></motion.div>)}
                    </Button>}
                </div>
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
                <div className="flex gap-1 mt-8 ">
                    {movie.Genre && movie.Genre.split(", ").map((gen: string) => <Badge className='bg-gray-600 text-white hover:bg-gray-950'>{gen}</Badge>)}
                </div>
                <div className=' bg-gray-900 text-white p-3 rounded-xl mt-4 md:mt-8'>
                    <p><b>imdb Rating: </b>{movie.imdbRating}</p>
                    {movie.Ratings.map((rating) => {
                        return (
                            <div className='w-full'>
                                <h3 ><span className='font-bold '>{rating.Source}: </span>{rating.Value}</h3>
                            </div>
                        )
                    })}

                </div>
            </div>
        </motion.div>
        {movie.Type == "series" && (
            <div className='w-full pt-10 px-4 lg:mx-auto'>
                <AcordeonSeasons imdbID={movie.imdbID} totalSeasons={movie.totalSeasons} />
            </div>
        )
        }
    </>
    )

    async function LikeMovie() {
        setLiked(!liked)
        await fetch(`${baseURL}/movies`, {
            method: "POST", body: JSON.stringify(movie), headers: {
                "Content-Type": "application/json"
            }
        }).
            then(response => response.json()).
            then(async () => {
                await liked ? setLiked(false) : setLiked(true)

            }).
            catch(() => {
                setLiked(!liked)
                toast("Algo deu errado", { description: "Verifique sua conexão" });
            })
    }
    async function verifyMovieIsLiked() {
        await fetch(`${baseURL}/movies/${movie.imdbID}`).then(response => response.json()).then(data => {
            data ? setLiked(true) : setLiked(false)
        })
    }
}
