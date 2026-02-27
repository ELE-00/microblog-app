// src/test/Login.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

vi.mock('../api/auth', () => ({
    login: vi.fn(),
}));

// useNavigate is provided by MemoryRouter — no need to mock react-router-dom
import { useAuth } from '../context/AuthContext';
import { login as loginAPI } from '../api/auth';

const mockLogin = vi.fn();

function renderLogin() {
    return render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
}

beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue({ login: mockLogin });
});

describe('Login page', () => {
    it('renders username input, password input, and submit button', () => {
        renderLogin();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });

    it('calls loginAPI with form values on submit', async () => {
        loginAPI.mockResolvedValue({ data: { user: { id: 1 }, username: 'testuser', token: 'tok' } });
        renderLogin();

        await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
        await userEvent.type(screen.getByLabelText(/password/i), 'password123');
        await userEvent.click(screen.getByRole('button', { name: /log in/i }));

        expect(loginAPI).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
    });

    it('calls context login() with user data on success', async () => {
        loginAPI.mockResolvedValue({ data: { user: { id: 5 }, username: 'alice', token: 'tok123' } });
        renderLogin();

        await userEvent.type(screen.getByLabelText(/username/i), 'alice');
        await userEvent.type(screen.getByLabelText(/password/i), 'pass');
        await userEvent.click(screen.getByRole('button', { name: /log in/i }));

        expect(mockLogin).toHaveBeenCalledWith({ id: 5, username: 'alice', token: 'tok123' });
    });

    it('shows an alert when the API call fails', async () => {
        loginAPI.mockRejectedValue(new Error('Invalid credentials'));
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        renderLogin();

        await userEvent.type(screen.getByLabelText(/username/i), 'baduser');
        await userEvent.type(screen.getByLabelText(/password/i), 'badpass');
        await userEvent.click(screen.getByRole('button', { name: /log in/i }));

        expect(alertSpy).toHaveBeenCalled();
        alertSpy.mockRestore();
    });
});
