'use client';

import React, { useRef, useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function MemoryGame() {
    const [selected, setSelected] = useState(false);
    const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

    const handleFormat = (
      event: React.MouseEvent<HTMLElement>,
      newFormats: string[],
    ) => {
      setFormats(newFormats);
    };
    

    return (
        <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        className="wrapper"
        >
        {number.map((val) => (
            <ToggleButton value={`item-${val}`} aria-label={`label-${val}`} className="memory-card">
            </ToggleButton>
        ))};
    </ToggleButtonGroup>
    );
}