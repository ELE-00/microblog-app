// src/test/AuthContext.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';

vi.mock('../socket.js', () => ({
    socket: {
        connect: vi.fn(),
        disconnect: vi.fn(),
        emit: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
    },
}));

vi.mock('../api/auth', () => ({
    getUserData: vi.fn(),
}));

import { socket } from '../socket.js';
import { getUserData } from '../api/auth';

// Helper component that exposes context values and functions for testing
function TestConsumer({ onRender }) {
    const ctx = useAuth();
    onRender(ctx);
    return null;
}

function renderWithProvider(onRender) {
    return render(
        <AuthProvider>
            <TestConsumer onRender={onRender} />
        </AuthProvider>
    );
}

beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // Default: getUserData resolves so the profile fetch doesn't blow up
    getUserData.mockResolvedValue({
        data: {
            id: 1,
            username: 'testuser',
            profile: { name: 'Test User', profilePic: null },
            posts: [],
        },
    });
});

describe('AuthContext', () => {
    it('login() sets user state and saves to localStorage', async () => {
        let ctx;
        renderWithProvider((c) => { ctx = c; });

        const userData = { id: 5, username: 'alice', token: 'tok' };
        act(() => ctx.login(userData));

        expect(localStorage.getItem('user')).toBe(JSON.stringify(userData));
        expect(socket.connect).toHaveBeenCalled();
        expect(socket.emit).toHaveBeenCalledWith('user-online', 5);
    });

    it('logout() clears user state and localStorage', async () => {
        localStorage.setItem('user', JSON.stringify({ id: 1, username: 'testuser', token: 'tok' }));
        let ctx;
        renderWithProvider((c) => { ctx = c; });

        act(() => ctx.logout());

        expect(localStorage.getItem('user')).toBeNull();
        expect(socket.disconnect).toHaveBeenCalled();
    });

    it('updatePosts({ post }) prepends a post to currentUserPosts', async () => {
        const newPost = { id: 10, content: 'New post' };
        getUserData.mockResolvedValue({
            data: {
                id: 1, username: 'testuser',
                profile: { name: 'Test', profilePic: null },
                posts: [{ id: 1, content: 'Existing' }],
            },
        });
        localStorage.setItem('user', JSON.stringify({ id: 1, username: 'testuser', token: 'tok' }));

        let ctx;
        renderWithProvider((c) => { ctx = c; });

        await waitFor(() => expect(ctx.currentUserPosts.length).toBe(1));

        act(() => ctx.updatePosts({ post: newPost }));

        expect(ctx.currentUserPosts[0]).toEqual(newPost);
        expect(ctx.currentUserPosts.length).toBe(2);
    });

    it('updatePosts({ delete, id }) removes a post from currentUserPosts', async () => {
        getUserData.mockResolvedValue({
            data: {
                id: 1, username: 'testuser',
                profile: { name: 'Test', profilePic: null },
                posts: [{ id: 1, content: 'Keep' }, { id: 2, content: 'Delete me' }],
            },
        });
        localStorage.setItem('user', JSON.stringify({ id: 1, username: 'testuser', token: 'tok' }));

        let ctx;
        renderWithProvider((c) => { ctx = c; });

        await waitFor(() => expect(ctx.currentUserPosts.length).toBe(2));

        act(() => ctx.updatePosts({ delete: true, id: 2 }));

        expect(ctx.currentUserPosts.length).toBe(1);
        expect(ctx.currentUserPosts[0].id).toBe(1);
    });

    it('updateProfilePic(url) updates profilePic in currentUserProfile', async () => {
        getUserData.mockResolvedValue({
            data: {
                id: 1, username: 'testuser',
                profile: { name: 'Test', profilePic: 'old.jpg' },
                posts: [],
            },
        });
        localStorage.setItem('user', JSON.stringify({ id: 1, username: 'testuser', token: 'tok' }));

        let ctx;
        renderWithProvider((c) => { ctx = c; });

        await waitFor(() => expect(ctx.currentUserProfile).not.toBeNull());

        act(() => ctx.updateProfilePic('new.jpg'));

        expect(ctx.currentUserProfile.profile.profilePic).toBe('new.jpg');
    });
});
