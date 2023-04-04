const Filter = ({ filter, handler }) => {
    return (
        <form>
            Filter shown with: <input value={filter} onChange={handler} />
        </form>
    )
}

export default Filter;