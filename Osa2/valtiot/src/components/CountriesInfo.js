import CountryInfo from './CountryInfo'

const CountriesInfo = ({ list, handler, selected }) => {
    if (selected.length > 0) {
        return (
            <div>
                <CountryInfo country={selected[0]} />
            </div>
        )
    }
    else {
        if (list.length === 1) {
            return (
                <div>
                    <CountryInfo country={list[0]} />
                </div>
            )
        }
        else if (list.length <= 10 && list.length > 0) {
            return (
                <div>
                    {list.map(country => <CountryName key={country.name.common}
                        country={country.name.common}
                        handler={() => handler(country.name.common)} />)}
                </div>
            )
        }
        else if (list.length > 10) {
            return (
                <div>
                    <p>Too many matches, please narrow the search</p>
                </div>
            )
        }
        else if (list.length === 0) {
            return (
                <div>
                    <p>No results</p>
                </div>
            )
        }
    }
}

const CountryName = ({ country, handler }) => {
    return (
        <p> {country} <button onClick={handler}>Select</button> </p>
    )
}

export default CountriesInfo