import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('should initially have an empty history', () => {
    render(<App />);
    expect(screen.queryByText(/History:/i)).not.toBeInTheDocument();
  });

  it('should add calculations to the history', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    await waitFor(() => expect(screen.getByText(/History:/i)).toBeInTheDocument());
    // More specific assertions here, depending on how history is displayed.  Example:
    expect(screen.getByText('1 + 2 = 3')).toBeInTheDocument(); // Adjust this to match your display format
  });

  it('should handle multiple calculations', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('='));
    await waitFor(() => expect(screen.getByText(/History:/i)).toBeInTheDocument());
    // Assertions to check the multiple history entries.  Example:
    expect(screen.getByText('1 + 2 = 3')).toBeInTheDocument();
    expect(screen.getByText('3 - 1 = 2')).toBeInTheDocument(); // Adjust to match your display
  });

  it('should clear the calculation history', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    fireEvent.click(screen.getByText('Clear History'));
    await waitFor(() => expect(screen.queryByText(/History:/i)).not.toBeInTheDocument());
  });

  // Add more tests for edge cases and different scenarios as needed.
  // Consider testing error handling (e.g., division by zero).
});
