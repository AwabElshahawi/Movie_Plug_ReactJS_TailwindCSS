import React from 'react'

const Search = ({searchterm,setSearchterm}) => {
  return (
    <div  className='search'>
      <div>
        <img src='search.svg' alt='search'>
        </img>

        <input
        type='text'
        placeholder='Seacrh for your favourite movies!'
        value={searchterm}
        onChange={(event) => setSearchterm(event.target.value)}
        />

      </div>
    </div>
  )
}

export default Search