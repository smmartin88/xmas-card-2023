"use client";

import React, { useRef, useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'

export default function Row(props: { isDisabled: boolean, i: number, setDisabled: (index: number) => void }) {
    const [code, setCode] = useState('');
    const [rowDisabled, setRowDisabled] = useState(props.isDisabled);

    // Refs to control each digit input element
    const inputRefs = [
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
    ];

    const indices = [0, 1, 2, 3, 4, 5];
    const cellColors = ['gray', 'gray', 'gray', 'gray', 'gray', 'gray'];
    const [cells, setCells] = useState(cellColors);
    const answer: string = 'SOPHIE';

    // Reset all inputs and clear state
    const resetCode = () => {
        inputRefs.forEach(ref => {
            if(ref.current) {
                ref.current.value = '';
            }
        });
        inputRefs[0].current.focus();
        setCode('');
        setCells(['gray', 'gray', 'gray', 'gray', 'gray', 'gray']);
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
    function handleInput(e: any, index: number) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];

        // Update code state with single digit
        const newCode = [...code];
        // Convert lowercase letters to uppercase
        if (/^[a-z]+$/.test(input.value)) {
            const uc = input.value.toUpperCase();
            newCode[index] = uc;
            inputRefs[index].current.value = uc;
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

    function goToNextLine(index: number) {
        props.setDisabled(index + 1);
    }

    // Handle special keys
    function handleKeyDown(e: any, index: number) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];
        var full = true;

        if ((e.keyCode === 8 || e.keyCode === 46) && input.value === '') {
            e.preventDefault();
            setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
            if (previousInput) {
                previousInput.current.focus();
            }
        } else if (e.keyCode === 13) {
            for(var item of inputRefs) {
                if (!item.current.value) {
                    full = false;
                }
            }
            if (full) {
                for(let i=0; i<6; i++) {
                    if(answer.indexOf(inputRefs[i].current.value) <= -1){  // character NOT found in answer  
                        cellColors[i] = "red";
                    } else if(answer.indexOf(inputRefs[i].current.value) > -1 && answer[i] !== inputRefs[i].current.value) { // letter is somewhere else in string
                        cellColors[i] = "#DEB887";
                    } else {
                        cellColors[i] = "green";
                    }
                }
                setCells(cellColors);
                setRowDisabled(true);
                goToNextLine(props.i);
            }
        }
    }

    // Capture pasted characters
    const handlePaste = (e: any) => {
        const pastedCode = e.clipboardData.getData('text');
        if (pastedCode.length === 6) {
            setCode(pastedCode);
            inputRefs.forEach((inputRef, index) => {
                inputRef.current.value = pastedCode.charAt(index);
            });
        }
    };

    // Clear button deletes all inputs and selects the first input for entry
    const ClearButton = () => {
        return (
            <button
                onClick={resetCode}
                className="text-2xl absolute right-[-30px] top-3"
            >
                <FaTimes />
            </button>
        )
    }

    return (
        <div className="flex gap-3 relative my-2">
            {indices.map((index) => (
                <input
                    className={`text-4xl w-16 flex p-3 text-center h-20`}
                    key={index}
                    type="text"
                    maxLength={1}
                    onChange={(e) => handleInput(e, index)}
                    ref={inputRefs[index]}
                    autoFocus={index === 0}
                    onFocus={handleFocus}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    style={{backgroundColor: cells[index]}}
                    disabled={rowDisabled}
                />
            ))}
            {
                code.length
                    ?
                    <ClearButton />
                    :
                    <></>
            }
        </div>
    );
}