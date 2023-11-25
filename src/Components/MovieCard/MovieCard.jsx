import React from 'react'
import { format, parseISO } from 'date-fns'
import { Rate } from 'antd'

import ApiService from '../../Services/ApiService'
import AltPoster from '../../img/question-mark.png'
import { slicedString, setVoteClass } from '../../Functions/Functions'

const MovieCard = ({ movie, genresList }) => {
  const onRateChange = async (value) => {
    try {
      await ApiService.postRating(movie.id, value)
      localStorage.setItem(movie.id, value)
    } catch (error) {
      console.error('Error posting rating:', error)
    }
  }
  return (
    <div className="film-card" key={movie.id}>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : AltPoster}
        alt="film poster"
        className="film-image"
      />
      <div className="film-info">
        <div className="film-header">
          <p className="film-title" title={movie.title}>
            {slicedString(movie.title, 20)}
          </p>
          <p className={`film-rating ${setVoteClass(movie.vote_average)}`}>{movie.vote_average.toFixed(1)}</p>
        </div>
        <p className="film-date">
          {movie.release_date ? format(parseISO(movie.release_date), 'MMMM d, y') : 'no release data'}
        </p>
        <div className="film-genres">
          {movie.genre_ids.length > 0 ? (
            movie.genre_ids.map((genreId) => {
              const genre = genresList.find((genre) => genre.id === genreId)
              return <span key={genreId}>{genre ? genre.name : 'Unknown Genre'}</span>
            })
          ) : (
            <span style={{ cursor: 'help' }}>No genres set yet</span>
          )}
        </div>
        <div className="film-desc" title={movie.overview}>
          {slicedString(movie.overview, 250)}
        </div>
        <Rate
          className="film-stars"
          count={10}
          defaultValue={localStorage.getItem(movie.id) ? localStorage.getItem(movie.id) : 0}
          onChange={onRateChange}
        />
      </div>
    </div>
  )
}

export default MovieCard
