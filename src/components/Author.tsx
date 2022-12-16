import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const Author = ({ data }) => {
  return (
    <div className='author-container'>
      {data.map((author) => (
        <div>{author.name}</div>
      ))}
    </div>
  )
}

export default Author
