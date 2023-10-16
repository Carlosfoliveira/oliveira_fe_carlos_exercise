import * as React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import * as API from '../../api';
import Teams from '../Teams';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('Teams', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render spinner while loading', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team1',
            },
        ]);

        render(<Teams />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });

        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    it('should render teams list', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.getByText('Team2')).toBeInTheDocument();
    });

    it('should be able to filter teams by name', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team One',
            },
            {
                id: '2',
                name: 'Team Two',
            },
        ]);

        render(<Teams />);

        await screen.findByText('Team One');

        const inputElement = await screen.findByLabelText('Search:');
        fireEvent.change(inputElement, {target: {value: 'two'}});

        const teamOneAfterSearch = screen.queryByText('Team One');
        const teamTwoAfterSearch = screen.queryByText('Team Two');

        expect(teamOneAfterSearch).not.toBeInTheDocument();
        expect(teamTwoAfterSearch).toBeInTheDocument();
    });
});
