import React, { useEffect, useState } from 'react'

function AutoSuggest() {
    const [input, setInput] = useState('')
    const [results, setResults] = useState([])
    const [show, setShow] = useState(false)
    const [cache, setCache] = useState({})

    const fetchData = async () => {
        if (cache[input]) {
            console.log(cache,'cache');
            
            console.log(cache[input], 'returened cache');
            setResults(cache[input])
            return
        }
        const data = await fetch('https://dummyjson.com/recipes/search?q=' + input)
        const res = await data.json()
        setResults(res?.recipes)
        console.log('api call',res?.recipes);

        setCache((prev) => ({ ...prev, [input]: res.recipes }))

    }

    useEffect(() => {
        const timer = setTimeout(fetchData, 300)
        return () => clearTimeout(timer)
    }, [input])


    return (
        <div className='auto-suggest-container'>
            <h1>Auto Complete Search Bar</h1>
            <input
                className='auto-suggest'
                value={input} onChange={(e) => setInput(e.target.value)}
                onFocus={() => setShow(true)}
                onBlur={() => setShow(false)}
            />

            {show && <div className='auto-suggest-list'>
                {
                    results?.map((item) => (
                        <span className='auto-suggest-list-item' key={item.id}>
                            {item.name}
                        </span>
                    ))
                }

            </div>}
        </div>
    )
}

export default AutoSuggest
