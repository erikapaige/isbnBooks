// bring in react and useState hook
import React, { useState } from 'react'
// bring in axios
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Homepage from './pages/Homepage'
import BookContext from './utils/BookContext/BookContext'

const App = () => {

  // setting state to query for books
  const [ bookState, setBookState ] = useState({
    search:'',
    books: []
  })

  // handling search input
  bookState.handleInputBookChange = event => {
    setBookState({ ...bookState, [event.target.name]: event.target.value })
  }

  // function to search api
  bookState.handleBookSubmit = event => {
    event.preventDefault()

    axios.get(`/api/books/${bookState.search}`)
      .then(({ data }) => {
        console.log(data)
        let newData = Object.keys(data)
        setBookState({ ...bookState, books: newData })
      })
      .catch(err => console.error(err))
  }
  
  return(
    <BookContext.Provider value={bookState}>
      <Homepage />
    </BookContext.Provider>
  )
}

export default App
