import React from "react";

const DisplayBox = (props) => {
    //checking for break-period n displaying break related ui
    if (props.state.breakTotalSec >= 0 && props.state.sesTotalSec === 0) {
        return (
            <div>
                <p>Break</p>
                {props.state.breakRunning ? (<p className="stop">stop</p>) : (<p className="start">start</p>)}
                <p className="timer">{`${props.state.breakMin}m : ${props.state.breakSec}s`}</p>
            </div>
        )
    }
    return (
        <div>
            <p>session</p>
            {props.state.sesRunning ? (<p className="stop">stop</p>) : (<p className="start">start</p>)}
            <p className="timer">{`${props.state.sesMin}m : ${props.state.sesSec}s`}</p>
        </div>
    )

}
export default DisplayBox;
