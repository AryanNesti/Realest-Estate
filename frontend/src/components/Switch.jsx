import './Switch.css';
import React, { useState, useEffect } from 'react';



const Switch = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );
    const toggleTheme = ( () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.id = theme;
    }, [theme]);
  return (
    < >
      <div className='Container'>
        <input onClick={toggleTheme}
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
        />
        <label
          className="react-switch-label"
          htmlFor={`react-switch-new`}
        >
        <span className={`react-switch-button`} />
        </label>
      </div>
    </>
  );
};

export default Switch;