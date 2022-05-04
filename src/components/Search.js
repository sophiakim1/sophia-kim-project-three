import React, { useState } from 'react'

const Search = ({searchText}) => {
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        searchText(text)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="e.g. stocks" 
                    onChange={(e) => setText(e.target.value)}
                    />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search