// src/test/ProtectedRoute.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

// Mock useAuth so we control the user state without touching context/socket
vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

import { useAuth } from '../context/AuthContext';

describe('ProtectedRoute', () => {
    it('redirects to /login when user is null', () => {
        useAuth.mockReturnValue({ user: null });

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<div>Protected Content</div>} />
                    </Route>
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Login Page')).toBeInTheDocument();
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('renders children (Outlet) when user is present', () => {
        useAuth.mockReturnValue({ user: { id: 1, username: 'testuser', token: 'abc' } });

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<div>Protected Content</div>} />
                    </Route>
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
        expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
    });
});
