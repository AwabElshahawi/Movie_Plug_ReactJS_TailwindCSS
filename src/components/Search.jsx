import React from 'react'
import searchLogo from '../assets/search.svg'

const Search = ({searchterm,setSearchterm}) => {
  return (
    <div  className='search'>
      <div>
        <img src={searchLogo} alt='search'>
        </img>

        <input
        type='text'
        placeholder='Search for your favourite movies!'
        value={searchterm}
        onChange={(event) => setSearchterm(event.target.value)}
        />

      </div>
    </div>
  )
}

export default Search