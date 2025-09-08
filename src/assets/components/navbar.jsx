import React from 'react'

const navbar = () => {
  return (
    <nav className="navbar  bg-purple-200">
        <div className="logo font-bold">Passop</div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </nav>
  )
}

export default navbar
