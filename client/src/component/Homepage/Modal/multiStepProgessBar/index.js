import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import classes from "./ProgessBar.module.css";


const MutliStepProgessBar = (props) => {
  return (
    <ProgressBar
      percent={((props.step - 1) * 100) / 2}
      filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
    >
      <Step transition="scale">
        {({ accomplished , index}) => (
          <div
            className={`${classes.step} ${
              accomplished ? `${classes.completed}` : ""
            }`}
          >
            1
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished , index}) => (
          <div
            className={`${classes.step} ${
              accomplished ? `${classes.completed}` : ""
            }`}
          >
            2
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
            className={`${classes.step} ${
              accomplished ? `${classes.completed}` : ""
            }`}
          >
            3
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MutliStepProgessBar
