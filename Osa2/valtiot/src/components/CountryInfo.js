const CountryInfo = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: <Capital capital={country.capital} /></p>
            <p>Area: {country.area}</p>
            <p>Population: {country.population}</p>
            <h4>Languages</h4>
            <ul>
                <Languages languages={country.languages} />
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} width="300" />
            
        </>
    )
}

const Capital = ({ capital }) => {
    if (capital.length === 1) {
        return (
            <>{capital}</>
        )
    }
    else {
        const capitals = capital.join(', ')
        return (
            <>{capitals}</>
        )
    }
}

const Languages = ({ languages }) => {
    const langArr = Object.entries(languages)
    if (langArr.length === 1) {
        return (
            <>
                <li key={langArr[0][0]}>{langArr[0][1]}</li>
            </>
        )
    }
    else {
        return (
            <>
                {langArr.map(lang => <li key={lang[0]}>{lang[1]}</li>)}
            </>
        )
    }
}

export default CountryInfo