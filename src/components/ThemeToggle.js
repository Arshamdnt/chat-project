import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../actions/themeActions';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <div className="theme-toggle">
      <IconButton onClick={() => dispatch(toggleTheme())}>
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </div>
  );
};

export default ThemeToggle;
