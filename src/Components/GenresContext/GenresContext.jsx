import { createContext, useState, useEffect } from 'react'

import ApiService from '../../Services/ApiService'

const GenreContext = createContext()

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    ApiService.getGenres()
      .then((genresData) => {
        setGenres(genresData)
      })
      .catch((error) => console.error(error))
  }, [])

  return <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>
}

export default GenreContext
