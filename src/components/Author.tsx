import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const Author = (props: { name: string }) => {
  console.log(props.name)
  return <div className='author-container'></div>
}

export default Author
