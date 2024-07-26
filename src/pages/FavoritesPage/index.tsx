import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { movieDTO } from '../../DTOs/MovieDTO'
import CarouselMovie from '../../components/CarouselMovie';
import Spinner from '../../components/Spinner';

const { VITE_API_BASE_URL } = import.meta.env

export default function FavoritePage() {
  const [movies, setMovies] = useState<movieDTO[]>([])
  const [series, setSeries] = useState<movieDTO[]>([])
  const [docs, setDocs] = useState<movieDTO[]>([])
  const [bio, setBio] = useState<movieDTO[]>([])
  const [episodes, setEpisodes] = useState<movieDTO[]>([])
  const [reload, setReload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getFavoritesMovies()
  }, [])

  useEffect(() => {
    getFavoritesMovies()
  }, [reload])

  return (
    <>
      <Header />

      {!isLoading && <div className='h-[100vh] flex justify-center items-center'>
        <Spinner className='w-24' />
      </div>}

      {isLoading && <div className='mx-auto  bg-black min-h-[100vh] overflow-hidden'>

        {movies[0] && <CarouselMovie data={movies} onCloseDrwaer={() => setReload(!reload)} title='Movies' />}

        {series[0] && <CarouselMovie data={series} onCloseDrwaer={() => setReload(!reload)} title='Series' />}

        {docs[0] && <CarouselMovie data={docs} onCloseDrwaer={() => setReload(!reload)} title='Docs' />}

        {bio[0] && <CarouselMovie data={bio} onCloseDrwaer={() => setReload(!reload)} title='Biographies' />}

        {episodes[0] && <CarouselMovie data={episodes} onCloseDrwaer={() => setReload(!reload)} title='Episodes' />}

      </div>}
    </>

  )
  async function getFavoritesMovies() {
    await fetch(`${VITE_API_BASE_URL}/movies`).then(response => response.json()).then(data => {
      setIsLoading(true)
      setMovies(data.filter((movie: movieDTO) => {
        if (movie.Type == "movie"
          && !movie.Genre.split(", ").some((gen: string) => gen == "Documentary")
          && !movie.Genre.split(", ").some((gen: string) => gen == "Biography")) {
          return movie
        }
      }))
      setSeries(data.filter((serie: movieDTO) => {
        if (serie.Type == "series"
          && serie.Genre.split(", ").some((gen: string) => gen != "Documentary")
          && serie.Genre.split(", ").some((gen: string) => gen != "Biography")) {
          return serie
        }
      }))
      setDocs(data.filter((doc: movieDTO) => doc.Genre.split(", ").some((gen: string) => gen == "Documentary") && doc))
      setBio(data.filter((bio: movieDTO) => bio.Genre.split(", ").some((gen: string) => gen == "Biography") && bio))
      setEpisodes(data.filter((episode: movieDTO) => episode.Type == "episode" && episode))
    })
  }



}
