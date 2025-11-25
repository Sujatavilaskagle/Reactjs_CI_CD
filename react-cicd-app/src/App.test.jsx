import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component - Registration Form', () => {
  test('renders registration heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('User Registration');
  });

  test('renders email and password input fields', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders register button', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /Register/i });
    expect(button).toBeInTheDocument();
  });

  test('email input accepts user input', async () => {
    const user = userEvent.setup();
    render(<App />);
    const emailInput = screen.getByLabelText(/Email:/i);
    
    await user.type(emailInput, 'test@example.com');
    expect(emailInput.value).toBe('test@example.com');
  });

  test('password input accepts user input', async () => {
    const user = userEvent.setup();
    render(<App />);
    const passwordInput = screen.getByLabelText(/Password:/i);
    
    await user.type(passwordInput, 'password123');
    expect(passwordInput.value).toBe('password123');
  });

  test('shows error message when fields are empty', async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole('button', { name: /Register/i });
    
    await user.click(button);
    const errorMessage = await screen.findByText(/Please fill in all fields/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('clears email and password after successful registration', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          message: 'User registered successfully',
          userId: '1763980239570',
        }),
      })
    );

    const user = userEvent.setup();
    render(<App />);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const button = screen.getByRole('button', { name: /Register/i });

    await user.type(emailInput, 'kaglesujata@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(button);

    await waitFor(() => {
      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });

    global.fetch.mockClear();
  });

  test('displays success message on successful registration', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          message: 'User registered successfully',
          userId: '1763980239570',
        }),
      })
    );

    const user = userEvent.setup();
    render(<App />);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const button = screen.getByRole('button', { name: /Register/i });

    await user.type(emailInput, 'kaglesujata@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(button);

    const successMessage = await screen.findByText(/User registered successfully/i);
    expect(successMessage).toBeInTheDocument();

    global.fetch.mockClear();
  });

  test('displays userId on successful registration', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          message: 'User registered successfully',
          userId: '1763980239570',
        }),
      })
    );

    const user = userEvent.setup();
    render(<App />);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const button = screen.getByRole('button', { name: /Register/i });

    await user.type(emailInput, 'kaglesujata@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(button);

    const userIdText = await screen.findByText(/User ID: 1763980239570/i);
    expect(userIdText).toBeInTheDocument();

    global.fetch.mockClear();
  });

  test('disables inputs and button while loading', async () => {
    global.fetch = jest.fn(() =>
      new Promise(resolve =>
        setTimeout(() =>
          resolve({
            ok: true,
            json: () => Promise.resolve({
              message: 'User registered successfully',
              userId: '1763980239570',
            }),
          }), 100)
      )
    );

    const user = userEvent.setup();
    render(<App />);
    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    const button = screen.getByRole('button', { name: /Register/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(button);

    await waitFor(() => {
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(button).toBeDisabled();
    });

    global.fetch.mockClear();
  });
});
