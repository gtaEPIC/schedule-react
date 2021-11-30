import React, {useState} from 'react';
import Square from "./Square";
import './Game.css';

function Board() {

    const [xTurn, setXTurn] = useState(true)
    const [status, setStatus] = useState("Next Player: X");

    function click(element: any): string {
        if (!element) {
            setStatus((xTurn ? "Next Player: O" : "Next Player: X"))
            let final = (xTurn ? "X" : "O")
            setXTurn(!xTurn);
            return final;
        }else return element;
    }

    function renderSquare(i: string) {
        return <Square value={i} onClick={click}/>
    }


    return(
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare("")}
                {renderSquare("")}
                {renderSquare("")}
            </div>
            <div className="board-row">
                {renderSquare("")}
                {renderSquare("")}
                {renderSquare("")}
            </div>
            <div className="board-row">
                {renderSquare("")}
                {renderSquare("")}
                {renderSquare("")}
            </div>
        </div>
    );

}

export default Board;