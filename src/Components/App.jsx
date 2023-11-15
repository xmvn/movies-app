/* eslint-disable no-unused-vars */
import './App.css'
import { useState, useEffect } from 'react'
import { Rate, Pagination, Tabs } from 'antd'
import { format, parseISO } from 'date-fns'

function slicedString(str, maxLength) {
  if (str.length <= maxLength) {
    return str
  }
  const lastSpaceIndex = str.lastIndexOf(' ', maxLength)
  return lastSpaceIndex > 0 ? str.slice(0, lastSpaceIndex) + '...' : str.slice(0, maxLength) + '...'
}
const App = () => {
  const [movieData, setMovieData] = useState()
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('return')
  const [page, setPage] = useState(1)
  const genres = [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ]
  const items = [
    { label: 'Search', key: 'item-1' },
    { label: 'Rated', key: 'item-2' },
  ]
  const getGenreNames = (ids) => {
    return ids
      .map((id) => {
        const genre = genres.find((genre) => genre.id === id)
        return genre ? genre.name : ''
      })
      .slice(0, 3)
  }

  const fetchData = async () => {
    setLoading(true)
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWM3ZDQyYjdmZmZhYWMyNzczYTY2ZWEyZWJlYzBiYiIsInN1YiI6IjY1NTQxOThhYWM0MTYxMDBjNjNiM2E2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s4T5sF-XCCAx7wVpaJI5Q3xv7snk_0bVnmGcJEt2h9I',
      },
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=${page}`,
        options
      )
      const data = await response.json()
      console.log(data)
      setMovieData(data)
      setLoading(false)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  const handleSubmit = (e) => {
    console.log(query, page)
    e.preventDefault()
    if (page !== 1) {
      setPage(1)
    } else if (query.length > 0) {
      fetchData()
    }
  }
  if (loading) return <div className="loading"> Идет загрузка, пожалуйста, подождите...</div>
  return (
    <div className="App">
      <div className="container">
        <header>
          <div className="header-buttons">
            <Tabs items={items} />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>{' '}
        </header>
        <div className="main-content">
          {movieData ? (
            movieData.results.map((e) => {
              const genreNames = getGenreNames(e.genre_ids)

              return (
                <div className="film-card" key={e.id}>
                  <img
                    src={
                      e.poster_path
                        ? `https://image.tmdb.org/t/p/original${e.poster_path}`
                        : 'https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg'
                    }
                    alt="film poster"
                    className="film-image"
                  />
                  <div className="film-info">
                    <div className="film-header">
                      <p className="film-title" onClick={() => console.log(e.title)}>
                        {slicedString(e.title, 20)}
                      </p>
                      <p className="film-rating">{e.vote_average.toFixed(1)}</p>
                    </div>
                    <p className="film-date">
                      {e.release_date ? format(parseISO(e.release_date), 'MMMM d, y') : 'no release data'}
                    </p>
                    <div className="film-genres">
                      {genreNames.length > 0 ? (
                        genreNames.map((genre, index) => <span key={index}>{genre}</span>)
                      ) : (
                        <p>no genres set yet</p>
                      )}
                    </div>
                    <div className="film-desc">{slicedString(e.overview, 250)}</div>
                    <Rate className="film-stars" allowHalf disabled count={10} defaultValue={e.vote_average} />
                  </div>
                </div>
              )
            })
          ) : (
            <></>
          )}
        </div>
        <footer>
          <Pagination
            defaultCurrent={page}
            current={movieData.page}
            total={movieData.total_pages}
            pageSize={1}
            onChange={(e) => setPage(e)}
            showQuickJumper={false}
            showSizeChanger={false}
          />
        </footer>
      </div>
    </div>
  )
}

export default App
