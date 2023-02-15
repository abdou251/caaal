import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import { FaShoppingCart } from 'react-icons/fa'

import './App.css'

function App() {
  function reducer(state, action) {
    // ...
  }

  const [state, dispatch] = useReducer(reducer, { qte: 1 })

  const [posts, setPosts] = useState([])
  const [sum, setSum] = useState([])
  const [result, setResult] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products?limit=5')
      .then((res) => {
        setPosts(res.data)

        posts.map((post) => {
          setSum(sum.push(post.price))
        })

        sum.forEach((item) => setResult((result) => (result = result + item)))
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [result, posts])

  return (
    <div style={{ width: '100%' }}>
      <nav>
        <ul>
          <li>CART</li>
          <li>
            <FaShoppingCart></FaShoppingCart>
          </li>
        </ul>
      </nav>
      <h1>Hello</h1>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className='posts'>
          {posts.map((post) => (
            <Products key={post.id} {...post} />
          ))}
          <h1>total</h1>
          <p>amount: {result}</p>
        </div>
      )}
    </div>
  )
}
const Products = (props) => {
  const { id, image, price } = props
  return (
    <div className='products' key={id}>
      <img src={image} alt='' />
      <p>{price}</p>
    </div>
  )
}
export default App
