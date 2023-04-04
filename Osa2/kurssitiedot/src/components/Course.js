const Course = ({ courses }) => {
    return (
        <>
            <h1>Web development curriculum</h1>
            {courses.map(course =>
                <div key={course.id}>
                    <Header name={course.name} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </div>
            )}
        </>
    )
}

const Header = ({ name }) => {
    return <h2>{name}</h2>
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part =>
                <p key={part.id}>
                    <Part text={part.name} exercises={part.exercises} />
                </p>
            )}
        </>
    )
}

const Part = (props) => {
    return <p>{props.text} {props.exercises}</p>
}

const Total = ({ parts }) => {
    const total = parts.reduce((acc, cV) => acc + cV.exercises, 0)
    return (
        <h4>
            Total of {total} exercises
        </h4>
    )
}

export default Course;