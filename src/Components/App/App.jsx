import './App.css'
import { useState, useEffect, useRef } from 'react'
import { debounce } from 'lodash'

import ApiService from '../../Services/ApiService'
import Footer from '../Footer/Footer'
import MovieList from '../MovieList/MovieList'
import Header from '../Header/Header'
import { GenreProvider } from '../GenresContext/GenresContext'

const App = () => {
  const [movieData, setMovieData] = useState()
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('return')
  const [page, setPage] = useState(1)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [selectedTab, setSelectedTab] = useState('Search')

  const fetchData = async () => {
    setLoading(true)
    if (selectedTab === 'Search') {
      try {
        const results = await ApiService.getSearchedMovies(query, page)
        setMovieData(results)
      } catch (error) {
        console.error('Ошибка при получении данных:', error)
        setError(true)
        setErrorMessage(error.message)
      } finally {
        setLoading(false)
      }
    } else if (selectedTab === 'Rated') {
      try {
        const results = await ApiService.getRatedMovies(page)
        setMovieData(results)
      } catch (error) {
        console.error('Ошибка при получении данных:', error)
        setError(true)
        setErrorMessage(error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    ApiService.createGuestSession().catch((error) => {
      console.error('Ошибка при создании гостевой сессии:', error)
    })
  }, [])

  useEffect(() => {
    let trimmedQuery = query.trim()
    if (trimmedQuery !== '') {
      fetchData()
    }
  }, [page, query, selectedTab])

  const debouncedSearch = useRef(
    debounce(async (value) => {
      setQuery(await value)
      setPage(1)
    }, 1000)
  ).current

  async function handleChange(value) {
    debouncedSearch(value)
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return (
    <GenreProvider>
      <div className="App">
        <div className="container">
          <Header handleChange={handleChange} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <MovieList movieData={movieData} error={error} errorMessage={errorMessage} loading={loading} />
          <Footer error={error} loading={loading} movieData={movieData} page={page} setPage={setPage} />
        </div>
      </div>
    </GenreProvider>
  )
}

export default App
