import React, { useContext } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Spin, Alert } from 'antd'

import GenreContext from '../GenresContext/GenresContext'
import MovieCard from '../MovieCard/MovieCard'

const MovieList = ({ movieData, error, loading, errorMessage, slicedString, setVoteClass }) => {
  const genresList = useContext(GenreContext)
  return (
    <div className="main-content">
      <Online>
        {error ? (
          <div className="error-message">
            <Alert message="Error" description={errorMessage} type="error" showIcon />
          </div>
        ) : loading ? (
          <div className="loading">
            <Spin size="large" />
          </div>
        ) : movieData.total_results ? (
          movieData.results.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                slicedString={slicedString}
                setVoteClass={setVoteClass}
                genresList={genresList}
              />
            )
          })
        ) : (
          <div>
            <p>По вашему запросу нет данных.</p>
          </div>
        )}
      </Online>
      <Offline>
        <div className="error-message">
          <Alert message="Error" description={'Проблемы с интернет соединением'} type="error" showIcon />
        </div>
      </Offline>
    </div>
  )
}

export default MovieList
