const Filter = ({ filter, handler }) => {
    return (
        <form>
            Find countries: <input value={filter} onChange={handler} />
        </form>
    )
}

export default Filter