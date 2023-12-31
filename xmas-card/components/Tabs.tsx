'use client';

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Wordle from './wordle/wordle';
import PhotoGrid from './photo-grid';
import MemoryGame from './memory';
import Connections from './connections';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <div>
            <Tabs TabIndicatorProps={{style: {background:'#710627'}}} value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={<span style={{ color: '#710627' }}>Home</span>} {...a11yProps(0)} />
                    <Tab label={<span style={{ color: '#710627' }}>Wordle</span>} {...a11yProps(1)} />
                    <Tab label={<span style={{ color: '#710627' }}>Connections</span>} {...a11yProps(2)} />
                    <Tab label={<span style={{ color: '#710627' }}>Memory</span>} {...a11yProps(3)} />
            </Tabs>
      <CustomTabPanel value={value} index={0}>
        <div className='text-center'>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl">Merry Christmas from the Martins! 🎅</h1>
            <p className="text-2xl text-gray-500">Click on one of the tabs at the top of the page to play any one of the three games!</p>
            <PhotoGrid/>
            <div className="footer">
            </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Wordle/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Connections/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div>
            <MemoryGame/>
        </div>
      </CustomTabPanel>
    </div>
  );
}