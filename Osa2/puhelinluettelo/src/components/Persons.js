const Persons = ({ list, personRemoval }) => {    
    return (
        <>
            {list.map(name => <Item key={name.id} text={name}
                personRemoval={() => personRemoval(name.id)} />)}
        </>
    )
}

const Item = ({ text, personRemoval }) => {
    return (
        <p>{text.name} {text.number} <button onClick={personRemoval}>delete</button> </p>
    )
}

export default Persons;