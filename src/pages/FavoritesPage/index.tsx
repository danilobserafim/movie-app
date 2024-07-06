import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { movieDTO } from '../SearchPage/DTO'
import CarouselMovie from '../../components/CarusselMovie';

export default function FavoritePage() {
  const [movies, setMovies] = useState<movieDTO[]>([])
  const [series, setSeries] = useState<movieDTO[]>([])
  const [docs, setDocs] = useState<movieDTO[]>([])
  const [bio, setBio] = useState<movieDTO[]>([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    getFavoritesMovies()
  }, [])

  useEffect(() => {
    getFavoritesMovies()
  }, [reload])

  return (
    <>
      <Header />

      <div className='fmx-auto  bg-black min-h-[100vh] overflow-hidden'>
        <div>
          <h2 className='w-full pl-4 md:text-5xl text-xl font-bold md:mt-20 text-white md:pl-5 mt-8' >Filmes</h2>
          <CarouselMovie data={movies} onClose={() => setReload(!reload)} />
        </div>

        <div>
          <h2 className='w-full pl-4 md:text-5xl text-xl font-bold md:mt-20 text-white md:pl-5 mt-8'>Series</h2>
          <CarouselMovie data={series} onClose={() => setReload(!reload)} />
        </div>

        <div>
          <h2 className='w-full pl-4 md:text-5xl text-xl font-bold md:mt-20 text-white md:pl-5 mt-8'>Docs</h2>
          <CarouselMovie data={docs} onClose={() => setReload(!reload)}/>
        </div>

        <div>
          <h2 className='w-full pl-4 md:text-5xl text-xl font-bold md:mt-20 text-white md:pl-5 mt-8'>Biographies</h2>
          <CarouselMovie data={bio} onClose={() => setReload(!reload)}/>
        </div>
      </div>
    </>
  )
  async function getFavoritesMovies() {
    await fetch("http://localhost:3333/movies").then(response => response.json()).then(data => {
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
    })
  }



}
