import { get, storeDB } from './utils/helpers.js'
import { renderCard } from './card.js'

const MOVIE_DATABASE_API = `https://api.themoviedb.org/3`
const POPULAR_MOVIES = `/discover/movie?sort_by=popularity.desc`
const getTargetMovie = id => `/movie/${id}?language=en-US`

const getRecommendations = movie_id =>
  `/movie/${movie_id}/recommendations?language=en-US`
const API_KEY = `e1624229ca6a1ecb839c2152fe39999a`
const getSearchWithQuery = query => `/search/movie?query=${query}`

const geData = apiNamespace => get(MOVIE_DATABASE_API, apiNamespace, API_KEY)

const searchInput = document.querySelector('#search')
const button = document.querySelector('#button')
const content = document.querySelector('#content')

const render = async () => {
  const movies = await storeDB.getAll()
  const ul = document.createElement('ul')

  content.innerHTML = ''

  movies.forEach(movie => {
    const li = document.createElement('li')
    const link = document.createElement('a')
    link.setAttribute('href', `#${movie.id}`)
    const text = document.createTextNode(movie.original_title)
    link.appendChild(text)
    li.append(link)
    ul.append(li)
  })
  content.append(ul)
}

const fetchData = async () => {
  try {
    const { results } = await geData(POPULAR_MOVIES)

    storeDB.setAll(results)
    render()
  } catch (err) {
    console.info(err)
  }
}

const handlerOnHashChange = async ({
  currentTarget: {
    location: { hash }
  }
}) => {
  if (!hash) {
    return render()
  }

  const id = Number(hash.replace(/#/, ''))
  const movieObj = await getCurrentMovie(id)
  const { results } = await geData(getRecommendations(id))

  renderCard(movieObj, results)
}

const getCurrentMovie = async id => {
  const movie = await geData(getTargetMovie(id))
  return movie
}

const handlerOnSubmit = async e => {
  e.preventDefault()
  const searchValue = searchInput.value.trim()

  if (searchValue) {
    try {
      const { results } = await geData(getSearchWithQuery(searchValue))

      storeDB.setAll(results)
      render()
    } catch (err) {
      console.info(err)
    } finally {
      searchInput.value = ''
    }
  }
}

export default (() => {
  window.addEventListener('DOMContentLoaded', fetchData)
  window.addEventListener('hashchange', handlerOnHashChange)
  button.addEventListener('click', handlerOnSubmit)
})()
