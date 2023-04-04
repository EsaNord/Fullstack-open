import { useState } from "react";

const App = () => {
    const [good, setGood] = useState(0)         // good = 1
    const [neutral, setNeutral] = useState(0)   // neutral = 0
    const [bad, setBad] = useState(0)           // bad = -1
    const [total, setTotal] = useState(0)

    const handleGood = () => {
        const newGood = good + 1
        setGood(newGood)
        setTotal(newGood + neutral + bad)
    }

    const handleNeutral = () => {
        const newNeutral = neutral + 1
        setNeutral(newNeutral)
        setTotal(good + newNeutral + bad)
    }

    const handleBad = () => {
        const newBad = bad + 1
        setBad(newBad)
        setTotal(good + neutral + newBad)
    }

    return (
        <div>
            <Header text='Give feedback' />
            <Button handleClick={handleGood} text='Good' />
            <Button handleClick={handleNeutral} text='Neutral' />
            <Button handleClick={handleBad} text='Bad' />
            <Statisticts good={good} neutral={neutral} bad={bad} total={total} />
        </div>
      );
}

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statisticts = ({ good, neutral, bad, total }) => {
    if (total > 0) {
        return (
            <>
                <Header text='Statistics' />
                <table>
                    <tbody>
                        <StatisticLine text='Good' value={good} />
                        <StatisticLine text='Neutral' value={neutral} />
                        <StatisticLine text='Bad' value={bad} />
                        <StatisticLine text='Total' value={total} />
                        <StatisticLine text='Average'
                            value={(good * 1 + neutral * 0 + bad * -1) / total} />
                        <StatisticLine text='Positive'
                                value={(good / total) * 100 + ' %'} />
                    </tbody>
                </table>
            </>
        )
    }

    return (
        <>
            <Header text='Statistics' />
            <p>No feedback given</p>
        </>
    )
}

const StatisticLine = ({ text, value }) => (
    <tr><td>{text}</td><td>{value}</td></tr>
)

export default App;