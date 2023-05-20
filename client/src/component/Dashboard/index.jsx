import React, { useState } from 'react';
import classes from './index.module.css'; // Import the CSS module

const Dashboard = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const togglePanel = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`${classes['sliding-panel']} ${isMinimized ? classes.minimized : ''}`}>
      <button onClick={togglePanel} >{isMinimized ? 'Open' : 'Close'}</button>
      {isMinimized ? (
        <div className={classes['icons-container']}>
          {/* Render your icons here */}
          <div className={classes.icon}></div>
          <div className={classes.icon}></div>
          <div className={classes.icon}></div>
        </div>
      ) : (
        <div>
          {/* Render the full content of the panel here */}
          <p>Panel Content</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
