import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import * as API from '../../api';
import TeamOverview from '../TeamOverview';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            teamName: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

const teamOverview = {
    id: '1',
    teamLeadId: '2',
    teamMemberIds: ['3', '4', '5'],
};

const usersData = [
    {
        id: '2',
        firstName: 'User',
        lastName: 'Two',
        displayName: 'userTwo',
        location: '',
        avatar: '',
    },
    {
        id: '3',
        firstName: 'User',
        lastName: 'Three',
        displayName: 'userThree',
        location: '',
        avatar: '',
    },
    {
        id: '4',
        firstName: 'User',
        lastName: 'Four',
        displayName: 'userFour',
        location: '',
        avatar: '',
    },
    {
        id: '5',
        firstName: 'User',
        lastName: 'Five',
        displayName: 'userFive',
        location: '',
        avatar: '',
    },
];

describe('TeamOverview', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render team overview users', async () => {
        jest.spyOn(API, 'getTeamOverview').mockImplementation(() => Promise.resolve(teamOverview));
        jest.spyOn(API, 'getUserData').mockImplementation(id =>
            Promise.resolve(usersData.find(user => user.id === id))
        );
        jest.spyOn(API, 'getUsersData').mockImplementation(ids =>
            Promise.resolve(usersData.filter(user => ids.includes(user.id)))
        );

        render(<TeamOverview />);

        const users = await screen.findAllByText(/User/);

        expect(users).toHaveLength(4);
    });

    it('should be able to filter users by name', async () => {
        jest.spyOn(API, 'getTeamOverview').mockImplementation(() => Promise.resolve(teamOverview));
        jest.spyOn(API, 'getUserData').mockImplementation(id =>
            Promise.resolve(usersData.find(user => user.id === id))
        );
        jest.spyOn(API, 'getUsersData').mockImplementation(ids =>
            Promise.resolve(usersData.filter(user => ids.includes(user.id)))
        );

        render(<TeamOverview />);

        const users = await screen.findAllByText(/User/);

        expect(users).toHaveLength(4);

        const inputElement = await screen.findByLabelText('Search:');
        fireEvent.change(inputElement, {target: {value: 'four'}});

        const userThreeAfterSearch = screen.queryByText('User Three');
        const userFourAfterSearch = screen.queryByText('User Four');

        expect(userThreeAfterSearch).not.toBeInTheDocument();
        expect(userFourAfterSearch).toBeInTheDocument();
    });
});
