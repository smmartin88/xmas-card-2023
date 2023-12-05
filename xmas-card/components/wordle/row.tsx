"use client";

import React, { useRef, useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'

export default function Row() {
    const [code, setCode] = useState('');
    const [cellColor, setCellColor] = useState("gray");

    // Refs to control each digit input element
    const inputRefs = [
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
        useRef<any>(null),
    ];

    // Reset all inputs and clear state
    const resetCode = () => {
        inputRefs.forEach(ref => {
            if(ref.current) {
                ref.current.value = '';
            }
        });
        inputRefs[0].current.focus();
        setCode('');
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

    // Handle special keys
    function handleKeyDown(e: any, index: number) {
        const input = e.target;
        const previousInput = inputRefs[index - 1];
        const nextInput = inputRefs[index + 1];

        if ((e.keyCode === 8 || e.keyCode === 46) && input.value === '') {
            e.preventDefault();
            setCode((prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1));
            if (previousInput) {
                previousInput.current.focus();
            }
        } else if (e.keyCode === 13) {
            console.log('hit it!');
            setCellColor('green');
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
        <div className="flex gap-2 relative my-2">
            {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                    className={`text-2xl bg-${cellColor}-800 w-10 flex p-2 text-center`}
                    key={index}
                    type="text"
                    maxLength={1}
                    onChange={(e) => handleInput(e, index)}
                    ref={inputRefs[index]}
                    autoFocus={index === 0}
                    onFocus={handleFocus}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
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