const PersonForm = (props) => {
    return (
        <form onSubmit={props.addName}>
            <p>
                Name: <input value={props.name} onChange={props.nameHandler} />
            </p>
            <p>
                Number: <input value={props.number} onChange={props.numberHandler} />
            </p>
            <p>
                <button type="submit">Add</button>
            </p>
        </form>
    )
}

export default PersonForm;