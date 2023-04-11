import { useEffect, useState } from 'react'

import countryService from './services/countries'
import Filter from './components/Filter'
import CountriesInfo from './components/CountriesInfo'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [selection, setSelection] = useState('')

    useEffect(() => {
        countryService.getCountries()
            .then(initialCountries => setCountries(initialCountries))
    }, [])

    const filteredList = filter.length > 0 ?
        countries.filter(country => country.name.common.toLowerCase().includes(filter))
        : countries

    const selected = selection.length > 0 ?
        countries.filter(country => country.name.common === selection)
        : []

    const hadleFiltering = (event) => {
        setFilter(event.target.value)
        if (selection.length > 0) {
            console.log('Reset selection')
            setSelection([])
        }
    }

    const handleSelection = (country) => {
        setSelection(country)
    }

    return (
        <div>
            <Filter filter={filter} handler={hadleFiltering} />
            <CountriesInfo list={filteredList}
                handler={handleSelection} selected={selected} />
        </div>
    )
}

export default App