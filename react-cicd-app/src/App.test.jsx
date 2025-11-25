import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders heading with initial message', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Welcome to React CI/CD App');
  });

  test('renders all three buttons', () => {
    render(<App />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent('Say Hello');
    expect(buttons[1]).toHaveTextContent('Welcome');
    expect(buttons[2]).toHaveTextContent('Reset');
  });

  test('changes message when Say Hello button is clicked', () => {
    render(<App />);
    const sayHelloButton = screen.getByRole('button', { name: /Say Hello/ });
    fireEvent.click(sayHelloButton);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Hello React!');
  });

  test('changes message when Welcome button is clicked', () => {
    render(<App />);
    const welcomeButton = screen.getByRole('button', { name: /Welcome/ });
    fireEvent.click(welcomeButton);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Welcome!');
  });

  test('resets message when Reset button is clicked', () => {
    render(<App />);
    const sayHelloButton = screen.getByRole('button', { name: /Say Hello/ });
    fireEvent.click(sayHelloButton);
    
    const resetButton = screen.getByRole('button', { name: /Reset/ });
    fireEvent.click(resetButton);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Welcome to React CI/CD App');
  });

  test('multiple button clicks update message correctly', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    const buttons = screen.getAllByRole('button');
    
    fireEvent.click(buttons[0]);
    expect(heading).toHaveTextContent('Hello React!');
    
    fireEvent.click(buttons[1]);
    expect(heading).toHaveTextContent('Welcome!');
    
    fireEvent.click(buttons[2]);
    expect(heading).toHaveTextContent('Welcome to React CI/CD App');
  });
});
