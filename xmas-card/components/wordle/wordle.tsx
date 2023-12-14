import Row from "./row";
import React, { useRef, useState, useEffect } from 'react';

export default function Wordle() {
    const [disabled, setDisabled] = useState([false, true, true, true, true, true])

    function setRowDisabled(index: number) {
        let temp = disabled;
        temp[index] = false;
        setDisabled(temp);
        console.log('entered!');
        console.log(disabled);
    }

    return (
        <div className='flex flex-col items-center'>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl">Wordle</h1>
            {disabled.map((rowBool, index) => (
                <Row isDisabled={rowBool} i={index} setDisabled={setRowDisabled}/>
            ))}
        </div>
    );
}