// src/test/FeedItem.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import FeedItem from '../components/FeedItem';

vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

vi.mock('../api/auth', () => ({
    postLiked: vi.fn(),
    likePost: vi.fn(),
    unlikePost: vi.fn(),
}));

import { useAuth } from '../context/AuthContext';
import { postLiked, likePost, unlikePost } from '../api/auth';

const mockPost = {
    id: 1,
    content: 'Hello world test post',
    image: null,
    createdAt: new Date().toISOString(),
    author: {
        id: 2,
        username: 'otheruser',
        profile: { name: 'Other User', profilePic: null },
    },
    _count: { likes: 5, comments: 3 },
};

function renderFeedItem(post = mockPost, handleDeletePost = vi.fn()) {
    return render(
        <MemoryRouter>
            <FeedItem item={post} handleDeletePost={handleDeletePost} />
        </MemoryRouter>
    );
}

beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue({
        user: { id: 1, username: 'testuser' },
        currentUserProfile: { profile: { profilePic: null } },
    });
    postLiked.mockResolvedValue({ data: null });
});

describe('FeedItem', () => {
    it('renders the post content', async () => {
        renderFeedItem();
        expect(screen.getByText('Hello world test post')).toBeInTheDocument();
    });

    it('renders author name and username', async () => {
        renderFeedItem();
        expect(screen.getByText(/Other User/)).toBeInTheDocument();
        expect(screen.getByText(/@otheruser/)).toBeInTheDocument();
    });

    it('renders like count and comment count', async () => {
        renderFeedItem();
        expect(screen.getByText('5')).toBeInTheDocument(); // likes
        expect(screen.getByText('3')).toBeInTheDocument(); // comments
    });

    it('does NOT show delete button when post author is a different user', async () => {
        renderFeedItem(); // post.author.id = 2, logged-in user.id = 1
        await waitFor(() => {
            expect(screen.queryByAltText('deleteicon.png')).not.toBeInTheDocument();
        });
    });

    it('shows delete button when post author is the logged-in user', async () => {
        const ownPost = { ...mockPost, author: { ...mockPost.author, id: 1 } };
        renderFeedItem(ownPost);
        await waitFor(() => {
            expect(screen.getByAltText('deleteicon.png')).toBeInTheDocument();
        });
    });

    it('shows empty heart (not liked) when postLiked returns null', async () => {
        postLiked.mockResolvedValue({ data: null });
        renderFeedItem();
        await waitFor(() => {
            expect(screen.getByAltText('heartIcon.png')).toBeInTheDocument();
            expect(screen.queryByAltText('redHeartIcon.png')).not.toBeInTheDocument();
        });
    });

    it('shows red heart (liked) when postLiked returns a like object', async () => {
        postLiked.mockResolvedValue({ data: { id: 1, userId: 1, postId: 1 } });
        renderFeedItem();
        await waitFor(() => {
            expect(screen.getByAltText('redHeartIcon.png')).toBeInTheDocument();
            expect(screen.queryByAltText('heartIcon.png')).not.toBeInTheDocument();
        });
    });

    it('calls likePost and switches to red heart on click', async () => {
        postLiked.mockResolvedValue({ data: null });
        likePost.mockResolvedValue({ data: {} });
        renderFeedItem();

        await waitFor(() => screen.getByAltText('heartIcon.png'));
        await userEvent.click(screen.getByAltText('heartIcon.png'));

        expect(likePost).toHaveBeenCalledWith(1);
        await waitFor(() => {
            expect(screen.getByAltText('redHeartIcon.png')).toBeInTheDocument();
        });
    });

    it('calls handleDeletePost with post id when delete button is clicked', async () => {
        const handleDelete = vi.fn();
        const ownPost = { ...mockPost, author: { ...mockPost.author, id: 1 } };
        renderFeedItem(ownPost, handleDelete);

        await waitFor(() => screen.getByAltText('deleteicon.png'));
        await userEvent.click(screen.getByAltText('deleteicon.png'));

        expect(handleDelete).toHaveBeenCalledWith(1);
    });
});
