import React, {useState} from 'react';
import './Game.css';

function Square({value, onClick} : {value: string, onClick: any}) {

    const [aValue, setAValue] = useState(value);

    return(
        <button className="square" onClick={() => {
            setAValue(onClick(aValue))
        }}>
            {aValue}
        </button>
    );

}

export default Square;