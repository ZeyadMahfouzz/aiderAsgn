import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import './App.css';
import calculate from '../logic/calculate';
import ToggleButton from './ToggleButton'; // Import the new ToggleButton component

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
    history: [],
    large: true,
    darkMode: false, // Add darkMode state
    error: null, // Add error state
  };

  handleClick = buttonName => {
    try {
      const { total, next, operation, history } = this.state;
      const result = calculate(this.state, buttonName);
      this.setState({ ...result, history: result.history, error: null }); // Clear error on successful calculation
    } catch (error) {
      this.setState({ error: error.message }); // Set error state if calculation fails
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    const keyMap = {
      '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
      '.': '.', '+': '+', '-': '-', '*': 'x', '/': '÷', '=': '=', 'Enter': '=', 'c': 'AC', 'Escape': 'AC',
      'Backspace': 'AC'
    };
    const buttonName = keyMap[event.key];
    if (buttonName) {
      this.handleClick(buttonName);
    }
  };

  toggleDarkMode = () => {
    this.setState(prevState => ({ darkMode: !prevState.darkMode }));
    document.body.classList.toggle('dark-mode'); // Toggle dark mode class on body
  };

  render() {
    const { next, total, history, darkMode, error } = this.state;
    return (
      <div className={`component-app large ${darkMode ? 'dark-mode' : ''}`}>
        <ToggleButton onClick={this.toggleDarkMode} /> {/* Add the toggle button */}
        <div className="display">
          <Display value={error || next || total || "0"} /> {/* Display error if present */}
        </div>
        <div className="history">
          <h3>History</h3>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                {item.expression.startsWith('0') ? item.expression.substring(1) : item.expression} = {item.result}
              </li>
            ))}
          </ul>
        </div>
        <ButtonPanel clickHandler={this.handleClick} />
      </div>
    );
  }
}
