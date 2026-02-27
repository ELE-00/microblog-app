// src/test/Signup.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../pages/Signup';

vi.mock('../api/auth', () => ({
    signup: vi.fn(),
}));

import { signup as signupAPI } from '../api/auth';

function renderSignup() {
    return render(
        <MemoryRouter>
            <Signup />
        </MemoryRouter>
    );
}

beforeEach(() => {
    vi.clearAllMocks();
});

describe('Signup page', () => {
    it('renders all four form fields and a submit button', () => {
        renderSignup();
        expect(screen.getByPlaceholderText(/jack1993/i)).toBeInTheDocument(); // username
        expect(screen.getByPlaceholderText(/jack black/i)).toBeInTheDocument(); // name
        // password fields don't have placeholders — find by position (type=password)
        const passwordInputs = screen.getAllByDisplayValue('');
        expect(passwordInputs.length).toBeGreaterThanOrEqual(4);
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('calls signupAPI with form values on submit', async () => {
        signupAPI.mockResolvedValue({ data: { message: 'User created' } });
        vi.spyOn(window, 'alert').mockImplementation(() => {});
        renderSignup();

        await userEvent.type(screen.getByPlaceholderText(/jack1993/i), 'newuser');
        await userEvent.type(screen.getByPlaceholderText(/jack black/i), 'New User');

        const passwordInputs = document.querySelectorAll('input[type="password"]');
        await userEvent.type(passwordInputs[0], 'password123');
        await userEvent.type(passwordInputs[1], 'password123');

        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(signupAPI).toHaveBeenCalledWith({
            username: 'newuser',
            name: 'New User',
            password: 'password123',
            passwordConfirm: 'password123',
        });
    });

    it('shows success alert on successful signup', async () => {
        signupAPI.mockResolvedValue({ data: {} });
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        renderSignup();

        await userEvent.type(screen.getByPlaceholderText(/jack1993/i), 'user');
        await userEvent.type(screen.getByPlaceholderText(/jack black/i), 'User');
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        await userEvent.type(passwordInputs[0], 'pass123');
        await userEvent.type(passwordInputs[1], 'pass123');
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/success/i));
        alertSpy.mockRestore();
    });

    it('shows error alert when signup fails', async () => {
        signupAPI.mockRejectedValue(new Error('Username already exists'));
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        renderSignup();

        await userEvent.type(screen.getByPlaceholderText(/jack1993/i), 'existing');
        await userEvent.type(screen.getByPlaceholderText(/jack black/i), 'Existing');
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        await userEvent.type(passwordInputs[0], 'pass123');
        await userEvent.type(passwordInputs[1], 'pass123');
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(alertSpy).toHaveBeenCalled();
        alertSpy.mockRestore();
    });
});
