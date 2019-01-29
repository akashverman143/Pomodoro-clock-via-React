import React from "react";
import DisplayBox from "./DisplayBox";

class App extends React.Component {
    state = {
        sesCounter: 5,
        sesMin:5,
        sesSec:0,
        sesTotalSec: 300,
        sesRunning: false,
        breakCounter: 3,
        breakMin:3,
        breakSec:0,
        breakTotalSec:180,
        breakRunning: false
    }

    //handling break start and resume
    runBreak = () => {
        if (this.state.breakRunning) {
            clearInterval(this.breakTimer);
            this.setState({
                breakRunning: false
            });
        }
        else {
            this.setState({
                breakRunning: true
            });
            const breakTick = () => {
                this.setState(({ breakTotalSec }) => ({ breakTotalSec: breakTotalSec - 1 }));
                let breakMin = parseInt(this.state.breakTotalSec / 60, 10);
                let breakSec = parseInt(this.state.breakTotalSec % 60, 10);
                this.setState({
                    breakMin: breakMin,
                    breakSec: breakSec,
                })
                if (this.state.breakTotalSec <= 0) {
                    clearInterval(this.breakTimer);
                    this.setState({
                        sesTotalSec: parseInt((this.state.sesCounter) * 60, 10),
                        breakRunning: false
                    });
                    this.runSession();
                }
            }

            this.breakTimer = setInterval(breakTick, 1000);
        }
    }

    //main event handler to first init. pomodoro 
    //handling session start and resume and transfer control to runbreak fn during break time
    runSession = () => {
        if (this.state.sesRunning) {
            clearInterval(this.sesTimer);
            this.setState({
                sesRunning: false
            });
        }
        //identifying break period and transferring control to runbreak fn when clicked happen
        else if (this.state.breakTotalSec >= 0 && this.state.sesTotalSec === 0) {
            this.runBreak();
        }
        // session period switched bw this else and above if command
        else {
            this.setState({
                sesRunning: true
            });
            const sesTick = () => {
                this.setState(({ sesTotalSec }) => ({ sesTotalSec: sesTotalSec - 1 }));
                let sesMin = parseInt(this.state.sesTotalSec / 60, 10);
                let sesSec = parseInt(this.state.sesTotalSec % 60, 10);
                this.setState({
                    sesMin: sesMin,
                    sesSec: sesSec,
                })
                //trigerring pomodoro technique, setting breakTotalSec before running break 
                //and vice versa, techinque to identify break n session period
                if (this.state.sesTotalSec <= 0) {
                    clearInterval(this.sesTimer);
                    this.setState({
                        breakTotalSec: parseInt((this.state.breakCounter) * 60, 10),
                        sesRunning: false
                    });
                    this.runBreak();
                }
            }
            this.sesTimer = setInterval(sesTick, 1000);
        }
    }

    //setting req state to def when user click +, - during running pomodoro
    setToDefault = () => {
        clearInterval(this.breakTimer);
        clearInterval(this.sesTimer);
        this.setState({
            breakRunning: false,
            sesRunning: false,
            sesSec: 0,
            breakSec: 0,
        });
    }

    incSesCounter = ()=>{
        this.setState(({ sesCounter, sesMin, sesTotalSec }) => {
            return {
                sesCounter: sesCounter + 1,
                sesMin: sesCounter + 1,
                sesTotalSec: parseInt((this.state.sesCounter + 1) * 60, 10)
            }
        })
        this.setToDefault();
    }
    
    decSesCounter = () => {
        this.setState(({ sesCounter, sesMin, sesTotalSec }) => {
            return {
                sesCounter: sesCounter - 1,
                sesMin: sesCounter - 1,
                sesTotalSec: parseInt((this.state.sesCounter - 1) * 60, 10)
            }
        })
        this.setToDefault();
    }

    incBreakCounter = ()=>{
        this.setState(({ breakCounter, breakMin, breakTotalSec }) => {
            return {
                breakCounter: breakCounter + 1,
                breakMin: breakCounter + 1,
                breakTotalSec: parseInt((this.state.breakCounter + 1) * 60, 10)
            }
        })
        this.setToDefault();
    }
    
    decBreakCounter = () => {
        this.setState(({ breakCounter, breakMin, breakTotalSec }) => {
            return {
                breakCounter: breakCounter - 1,
                breakMin: breakCounter - 1,
                breakTotalSec: parseInt((this.state.breakCounter - 1) * 60, 10)
            }
        })
        this.setToDefault();
    }

    render() {

        const {sesCounter, breakCounter} = this.state;

        return(
            <div className='clockHome' >
                <h2>Pomodoro clock</h2>
                <p className = "indicator">SET SESSION</p>
                <button className = "btn" onClick = {this.incSesCounter}>+</button>
                    {sesCounter}
                <button className="btn" onClick={this.decSesCounter} disabled={sesCounter <= 1} >-</button>

                <div className = "displayBox" onClick={this.runSession}>
                    <DisplayBox state={this.state}/>
                </div>

                <button className="btn" onClick = {this.incBreakCounter}>+</button>
                    {breakCounter}
                <button className="btn" onClick={this.decBreakCounter} disabled={breakCounter <= 1} >-</button>
                <p className="indicator">SET BREAK</p>
            </div>
        )
    }
}
export default App;
