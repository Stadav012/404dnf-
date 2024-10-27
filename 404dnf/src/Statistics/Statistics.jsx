import "./statistics.css"



function Statistics({title, stats}) {
    return (
        <div className="statistics">
            <h2>{title}</h2>
            <p>{stats}</p>
        </div>
    )
}

export default Statistics