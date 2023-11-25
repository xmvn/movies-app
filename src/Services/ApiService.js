const API_URL = 'https://api.themoviedb.org/3/'
const SESSION_URL = `${API_URL}authentication/guest_session/new`
const GENRES_URL = `${API_URL}genre/movie/list?language=en`
const API_KEY = '7ec7d42b7fffaac2773a66ea2ebec0bb'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWM3ZDQyYjdmZmZhYWMyNzczYTY2ZWEyZWJlYzBiYiIsInN1YiI6IjY1NTQxOThhYWM0MTYxMDBjNjNiM2E2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s4T5sF-XCCAx7wVpaJI5Q3xv7snk_0bVnmGcJEt2h9I',
  },
}

const getResource = async (url, options) => {
  const res = await fetch(url, options)
  if (!res.ok) {
    throw new Error(`Failed to retrieve data from ${url}. Server responded with status ${res.status}`)
  }
  return res.json()
}

const createGuestSession = async () => {
  try {
    if (!sessionStorage.getItem('guest_token')) {
      localStorage.clear()
      const response = await getResource(SESSION_URL, options)
      sessionStorage.setItem('guest_token', response.guest_session_id)
    }
    return sessionStorage.getItem('guest_token')
  } catch (error) {
    console.error('Error creating guest session:', error)
    throw error
  }
}

const getSearchedMovies = async (query, page = 1) => {
  try {
    const data = await getResource(
      `${API_URL}search/movie?query=${query}&include_adult=true&language=en-US&page=${page}`,
      options
    )
    return data
  } catch (error) {
    console.error('Error fetching searched movies:', error)
    throw error
  }
}

const getRatedMovies = async (page = 1) => {
  try {
    const data = await getResource(
      `${API_URL}guest_session/${sessionStorage.getItem('guest_token')}/rated/movies?page=${page}&api_key=${API_KEY}`
    )
    if (data.results.length === 0) {
      console.warn('No rated movies found for the given guest session and page.')
    }
    return data
  } catch (error) {
    console.error('Error fetching rated movies:', error)
    throw error
  }
}

const getGenres = async () => {
  try {
    const data = await getResource(GENRES_URL, options)
    return data.genres
  } catch (error) {
    console.error('Error fetching genres:', error)
    throw error
  }
}

const postRating = async (movieId, rating) => {
  try {
    const data = await getResource(
      `${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${sessionStorage.getItem('guest_token')}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: rating }),
      }
    )
    return data
  } catch (error) {
    console.error('Error posting rating:', error)
    throw error
  }
}

const ApiService = {
  createGuestSession,
  getSearchedMovies,
  getRatedMovies,
  getGenres,
  postRating,
}

export default ApiService
