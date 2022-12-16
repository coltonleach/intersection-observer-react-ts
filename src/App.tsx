import { QueryClient, useQuery } from 'react-query'
import axios from 'axios'
import { authorData } from './@types/authorData'
import './App.css'
import Author from './components/Author'
import Quote from './components/Quote'
import Header from './components/Header'
import { useEffect, useRef, useState } from 'react'

function App() {
  const [active, setActive] = useState(1)
  const quoteRefs = useRef([])
  const quoteContainerRef = useRef(null)
  quoteRefs.current = []

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['author'],
    queryFn: async () => {
      const { data } = await axios('http://localhost:8080/authors')
      return data
    },
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    quoteRefs.current.forEach((quote, index) => {
      observer.observe(quote)
    })
  }, [data])

  const observerCallback = (entries, observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        setActive(Number(entry.target.getAttribute('data-author')))
    })
  }

  const options = {
    root: quoteContainerRef.current,
    rootMargin: '-50% 0px',
  }

  const observer = new IntersectionObserver(observerCallback, options)

  if (isLoading) {
    return <div>loading..</div>
  }

  if (isError) {
    console.log(error)
    return <div>error</div>
  }

  const addRefs = (el: React.HTMLAttributes<HTMLDivElement>) => {
    if (el) quoteRefs.current.push(el)
  }

  return (
    <>
      {/* <Header /> */}
      <div className='container'>
        <div className='author-container'>
          {data.map((author: authorData) => (
            <h2
              key={author.id}
              className={`author ${author.id === active ? '' : 'hide'}`}
              data-author={author.id}
              data-active-author={author.id === active}
            >
              {author.name}
            </h2>
          ))}
        </div>
        <div className='quote-container' ref={quoteContainerRef}>
          {data.map((author: authorData) => (
            <div
              key={author.id}
              className='author-quotes'
              data-active-author={author.id === active}
              data-author={author.id}
              ref={addRefs}
            >
              {author.quotes.map((quote) => (
                <p key={quote} className='quote'>
                  {quote}
                </p>
              ))}
            </div>
          ))}
        </div>
        {/* <Author data={data} />
        <Quote data={data} /> */}
      </div>
    </>
  )
}

export default App
