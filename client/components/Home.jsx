import React from 'react'
import { Link } from 'react-router-dom'

function Home () {
  function handelClick (evt) {

  }

  return (
    <>
      <Link to='/page'>Another Page</Link>

      <div>
        <p>Content</p>
        <button onClick ={handelClick}>Click</button>

      </div>
    </>
  )
}

export default Home
