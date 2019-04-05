const getImageUrl = url => `https://image.tmdb.org/t/p/w500${url}`

export const renderCard = (card, recommendations) => {
  const article = document.createElement('article')
  const image = document.createElement('img')
  const heading = document.createElement('h1')
  const overview = document.createElement('p')
  const list = document.createElement('ul')
  const title = document.createElement('h3')

  image.style.cssText = 'max-width: 800px; border: 1px solid black'
  image.setAttribute('src', getImageUrl(card.poster_path))
  heading.innerHTML = card.title
  overview.innerHTML = card.overview
  title.innerHTML = `Recommendations:`

  const rec = recommendations.map(movie => {
    const li = document.createElement('li')
    const link = document.createElement('a')
    link.setAttribute('href', `#${movie.id}`)
    link.innerText = movie.title
    li.append(link)
    return li
  })
  list.append(...rec)

  article.append(image)
  article.append(heading)
  article.append(overview)
  article.append(title)
  article.append(list)

  content.innerHTML = ''
  content.append(article)
}
