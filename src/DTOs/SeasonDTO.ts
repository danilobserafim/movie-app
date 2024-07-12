export type SeasonDTO = {
    Title: string,
    Season: string,
    totalSeasons: string,
    Episodes: [
      {
        Title: string,
        Released: string,
        Episode: string,
        imdbRating: string,
        imdbID: string
      },
      
    ],
    "Response": string
  }