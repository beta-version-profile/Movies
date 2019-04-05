const getImageUrl = url => `https://image.tmdb.org/t/p/w500${url}`

export const renderCard = async (card, recommendations) => {
  const article = document.createElement('article')
  const image = document.createElement('img')
  const heading = document.createElement('h1')
  const overview = document.createElement('p')
  const ul = document.createElement('ul')

  image.style.cssText = 'max-width: 800px; border: 1px solid black'
  await image.setAttribute('src', getImageUrl(card.poster_path))
  heading.innerHTML = card.title
  overview.innerHTML = card.overview

  const rec = recommendations.map(movie => {
    const li = document.createElement('li')
    li.innerText = movie.title
    return li
  })
  ul.append(...rec)

  article.append(image)
  article.append(heading)
  article.append(overview)
  article.append(ul)

  content.innerHTML = ''
  content.append(article)
}
