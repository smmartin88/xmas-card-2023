"use client";

import React, { useRef, useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'

export default function Wordle() {
    const [code, setCode] = useState('');
    const [rowDisabled, setRowDisabled] = useState([false, true, true, true, true, true]);

    function setCurrentRowDisabled(index: number) {
        let temp = rowDisabled;
        temp[index] = true;
        setRowDisabled(temp);
    }

    function enableNextRow(index: number) {
        let temp = rowDisabled;
        temp[index + 1] = false;
        setRowDisabled(temp);
    }

    // Refs to control each digit input element
    const inputRefs = [[
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
    ], [
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
    ], [
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
    ], [
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
    ], [
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
    ],[
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
    ]];

    const indices = [0, 1, 2, 3, 4, 5];
    const cellColors = [
        ['gray', 'gray', 'gray', 'gray', 'gray', 'gray'],
        ['gray', 'gray', 'gray', 'gray', 'gray', 'gray'],
        ['gray', 'gray', 'gray', 'gray', 'gray', 'gray'],
        ['gray', 'gray', 'gray', 'gray', 'gray', 'gray'],
        ['gray', 'gray', 'gray', 'gray', 'gray', 'gray'],
        ['gray', 'gray', 'gray', 'gray', 'gray', 'gray']
    ];
    const [cells, setCells] = useState(cellColors);
    const answers = ['WORDLE', 'GRINCH', 'JINGLE', 'WINTER', 'TINSLE', 'BOUGHS', 'CANDLE', 'BAKING', 'FROSTY'];
    const [answer, setAnswer] = useState(answers[Math.floor(Math.random() * answers.length)]);
    const [gameOver, setGameOver] = useState(false);

    function setCellsMatrixx(colors: string[], rowNum: number) {
        let newColors = [];

        for(let outerIndex = 0; outerIndex < 6; outerIndex++) {
            if (outerIndex === rowNum) {
                newColors.push(colors);
            } else {
                newColors.push(cells[outerIndex]);
            }
        }
        setCells(newColors);
    }

    // Reset all inputs and clear state
    const resetCode = (index: number, row: number) => {
        inputRefs[index].forEach(ref => {
            if(ref.current) {
                ref.current.value = '';
            }
        });
        inputRefs[index][0].current.focus();
        setCode('');
        setCellsMatrixx(['gray', 'gray', 'gray', 'gray', 'gray', 'gray'], row);
    }


    // Call our callback when code = 6 chars
    /* useEffect(() => {
        if (code.length === 6) {
            if (typeof callback === 'function') callback(code);
            resetCode();
        }
    }, [code]); //eslint-disable-line */

    // Listen for external reset toggle
    /*useEffect(() => {
        resetCode();
    }, [reset]); //eslint-disable-line*/

    // Handle input
    function handleInput(e: any, index: number, row: number) {
        const input = e.target;
        const previousInput = inputRefs[row][index - 1];
        const nextInput = inputRefs[row][index + 1];

        // Update code state with single digit
        const newCode = [...code];
        // Convert lowercase letters to uppercase
        if (/^[a-z]+$/.test(input.value)) {
            const uc = input.value.toUpperCase();
            newCode[index] = uc;
            inputRefs[row][index].current.value = uc;
        } else {
            newCode[index] = input.value;
        }
        setCode(newCode.join(''));

        input.select();

        if (input.value === '') {
            // If the value is deleted, select previous input, if exists
            if (previousInput) {
                previousInput.current.focus();
            }
        } else if (nextInput) {
            // Select next input on entry, if exists
            nextInput.current.select();
        }
    }

    // Select the contents on focus
    function handleFocus(e: any) {
        e.target.select();
    }


    // Handle special keys
    function handleKeyDown(e: any, index: number, row: number) {
        const input = e.target;
        const previousInput = inputRefs[row][index - 1];
        var full = true;

        if ((e.keyCode === 8 || e.keyCode === 46) && input.value === '') {
            e.preventDefault();
            setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
            if (previousInput) {
                previousInput.current.focus();
            }
        } else if (e.keyCode === 13) {
            for(var item of inputRefs[row]) {
                if (!item.current.value) {
                    full = false;
                }
            }
            if (full) {
                const currentColors = cells[row];
                for(let i=0; i<6; i++) {
                    if(answer.indexOf(inputRefs[row][i].current.value) <= -1){  // character NOT found in answer  
                        currentColors[i] = "red";
                    } else if(answer.indexOf(inputRefs[row][i].current.value) > -1 && answer[i] !== inputRefs[row][i].current.value) { // letter is somewhere else in string
                        currentColors[i] = "#CDBA2E";
                    } else {
                        currentColors[i] = "green";
                    }
                }
                setCellsMatrixx(currentColors, row);
                const word = inputRefs[row].map((val, idx) => {
                    return val.current.value;
                });
                const wordStr = word.join('');
                if (wordStr === answer || row === 5) {
                    setCurrentRowDisabled(row);
                    setGameOver(true);
                } else {
                    setCurrentRowDisabled(row);
                    enableNextRow(row);
                }
            }
        }
    }

    // Capture pasted characters
    /* const handlePaste = (e: any, row: number) => {
        const pastedCode = e.clipboardData.getData('text');
        if (pastedCode.length === 6) {
            setCode(pastedCode);
            inputRefs[row].forEach((inputRef, index) => {
                inputRef.current.value = pastedCode.charAt(index);
            });
        }
    }; */

    // EITHER fix multiple letters in word about it is in correct place OR only
    // have words that have no duplicated letters and add that to the rules
    return (
        <div className='flex flex-col items-center'>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl">Wordle</h1>
            <p className="text-gray-600" style={{fontStyle: 'italic'}}>(If on phone, scroll down for rules)</p>
            <div className='flex sm:flex-row flex-col items-center justify-evenly' style={{width: '70%'}}>
                <div className='flex flex-col items-center'>
                    <div className="flex s:gap-3 gap-1 relative my-2">
                        {indices.map((index) => (
                            <input
                                className={`s:text-4xl S:w-16 flex s:p-3 text-center s:h-20 text-white text-2xl w-12 h-16 p-1`}
                                type="text"
                                maxLength={1}
                                onChange={(e) => handleInput(e, index, 0)}
                                ref={inputRefs[0][index]}
                                autoFocus={index === 0}
                                onFocus={handleFocus}
                                onKeyDown={(e) => handleKeyDown(e, index, 0)}
                                style={{backgroundColor: cells[0][index]}}
                                disabled={rowDisabled[0]}
                                id='row-0'
                            />
                        ))}
                    </div>
                    <div className="flex s:gap-3 gap-1 relative my-2">
                        {indices.map((index) => (
                            <input
                                className={`s:text-4xl S:w-16 flex s:p-3 text-center s:h-20 text-white text-2xl w-12 h-16 p-1`}
                                type="text"
                                maxLength={1}
                                onChange={(e) => handleInput(e, index, 1)}
                                ref={inputRefs[1][index]}
                                autoFocus={index === 0}
                                onFocus={handleFocus}
                                onKeyDown={(e) => handleKeyDown(e, index, 1)}
                                style={{backgroundColor: cells[1][index]}}
                                disabled={rowDisabled[1]}
                                id='row-1'
                            />
                        ))}
                    </div>
                    <div className="flex s:gap-3 gap-1 relative my-2">
                        {indices.map((index) => (
                            <input
                                className={`s:text-4xl S:w-16 flex s:p-3 text-center s:h-20 text-white text-2xl w-12 h-16 p-1`}
                                type="text"
                                maxLength={1}
                                onChange={(e) => handleInput(e, index, 2)}
                                ref={inputRefs[2][index]}
                                autoFocus={index === 0}
                                onFocus={handleFocus}
                                onKeyDown={(e) => handleKeyDown(e, index, 2)}
                                style={{backgroundColor: cells[2][index]}}
                                disabled={rowDisabled[2]}
                                id='row-2'
                            />
                        ))}
                    </div>
                    <div className="flex s:gap-3 gap-1 relative my-2">
                        {indices.map((index) => (
                            <input
                                className={`s:text-4xl S:w-16 flex s:p-3 text-center s:h-20 text-white text-2xl w-12 h-16 p-1`}
                                type="text"
                                maxLength={1}
                                onChange={(e) => handleInput(e, index, 3)}
                                ref={inputRefs[3][index]}
                                autoFocus={index === 0}
                                onFocus={handleFocus}
                                onKeyDown={(e) => handleKeyDown(e, index, 3)}
                                style={{backgroundColor: cells[3][index]}}
                                disabled={rowDisabled[3]}
                                tabIndex={3}
                                id='row-3'
                            />
                        ))}
                    </div>
                    <div className="flex s:gap-3 gap-1 relative my-2">
                        {indices.map((index) => (
                            <input
                                className={`s:text-4xl S:w-16 flex s:p-3 text-center s:h-20 text-white text-2xl w-12 h-16 p-1`}
                                type="text"
                                maxLength={1}
                                onChange={(e) => handleInput(e, index, 4)}
                                ref={inputRefs[4][index]}
                                autoFocus={index === 0}
                                onFocus={handleFocus}
                                onKeyDown={(e) => handleKeyDown(e, index, 4)}
                                style={{backgroundColor: cells[4][index]}}
                                disabled={rowDisabled[4]}
                                tabIndex={4}
                                id='row-4'
                            />
                        ))}
                    </div>
                    <div className="flex s:gap-3 gap-1 relative my-2">
                        {indices.map((index) => (
                            <input
                                className={`s:text-4xl S:w-16 flex s:p-3 text-center s:h-20 text-white text-2xl w-12 h-16 p-1`}
                                type="text"
                                maxLength={1}
                                onChange={(e) => handleInput(e, index, 5)}
                                ref={inputRefs[5][index]}
                                autoFocus={index === 0}
                                onFocus={handleFocus}
                                onKeyDown={(e) => handleKeyDown(e, index, 5)}
                                style={{backgroundColor: cells[5][index]}}
                                disabled={rowDisabled[5]}
                                tabIndex={5}
                                id='row-5'
                            />
                        ))}
                    </div>
                    {gameOver && 
                        <p className="text-4xl text-gray-900">{answer}</p>
                    }
                </div>
                <div className="text-gray-700 flex flex-col rules">
                    <h2 className="font-extrabold" style={{margin: '10px 0'}}>Rules:</h2>
                    <p style={{margin: '10px 0', fontStyle: 'italic'}}>**Disclaimer** We are fully aware that Wordle uses 5-letter words. However, this is the Martin Christmas Card, so we are using 6-letter words. Deal with it.</p>
                    <p style={{margin: '10px 0'}}>- Type out your guess, then hit enter. To enter next word, click on the first box to start typing. The colors are as indicated below:</p>
                    <p style={{margin: '10px 0'}}><span style={{backgroundColor: 'red', padding: '10px', margin: '10px', color: 'white', fontWeight: 'bold'}}>A</span> The letter is NOT in the word</p>
                    <p style={{margin: '10px 0'}}><span style={{backgroundColor: '#CDBA2E', padding: '10px', margin: '10px', color: 'white', fontWeight: 'bold'}}>A</span> The letter is in the word but in the wrong place</p>
                    <p style={{margin: '10px 0'}}><span style={{backgroundColor: 'green', padding: '10px', margin: '10px', color: 'white', fontWeight: 'bold'}}>A</span> The letter is in the correct place!</p>
                    <p style={{margin: '10px 0'}}>- There ARE plural words as options, but NO words have repeated letters</p>
                    <p style={{margin: '10px 0'}}>- This is not attached to a dictionary, so any word is fair game. We have a list of random words so this can be played more than once!</p>
                </div>
            </div>
        </div>
    );
}