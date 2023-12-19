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
    const answer: string = 'SOPHIE';

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
        const nextInput = row <= 5 ? inputRefs[row + 1][0] : null;
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
                        currentColors[i] = "#DEB887";
                    } else {
                        currentColors[i] = "green";
                    }
                }
                setCellsMatrixx(currentColors, row);
                setCurrentRowDisabled(row);
                enableNextRow(row);
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

    return (
        <div className='flex flex-col items-center'>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl">Wordle</h1>
            <div className="flex gap-3 relative my-2">
                {indices.map((index) => (
                    <input
                        className={`text-4xl w-16 flex p-3 text-center h-20`}
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
            <div className="flex gap-3 relative my-2">
                {indices.map((index) => (
                    <input
                        className={`text-4xl w-16 flex p-3 text-center h-20`}
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
            <div className="flex gap-3 relative my-2">
                {indices.map((index) => (
                    <input
                        className={`text-4xl w-16 flex p-3 text-center h-20`}
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
            <div className="flex gap-3 relative my-2">
                {indices.map((index) => (
                    <input
                        className={`text-4xl w-16 flex p-3 text-center h-20`}
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
            <div className="flex gap-3 relative my-2">
                {indices.map((index) => (
                    <input
                        className={`text-4xl w-16 flex p-3 text-center h-20`}
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
            <div className="flex gap-3 relative my-2">
                {indices.map((index) => (
                    <input
                        className={`text-4xl w-16 flex p-3 text-center h-20`}
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
            <p>you won!</p>
        </div>
    );
}