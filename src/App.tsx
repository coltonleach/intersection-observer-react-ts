import { QueryClient, useQuery } from 'react-query'
import axios from 'axios'
import { authorData } from './@types/authorData'
import './App.css'
import Author from './components/Author'
import Description from './components/Description'
import Header from './components/Header'

const queryClient = new QueryClient({})

function App() {
  // const [data, setDate] = useState()

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['author'],
    queryFn: async () => {
      const { data } = await axios('http://localhost:8080/authors')
      return data
    },
    refetchOnWindowFocus: false,
  })

  console.log(data)

  if (isLoading) {
    return <div>loading..</div>
  }

  if (isError) {
    return <div>{error}</div>
  }

  return (
    <>
      {/* <Header /> */}
      <div className='container'>
        <Author name={data[0].name} />
        <Description />
      </div>
    </>
  )
}

export default App
