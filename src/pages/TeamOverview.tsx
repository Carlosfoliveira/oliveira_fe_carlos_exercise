import React, {useEffect, useMemo, useState, Fragment} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import {useSearch} from 'hooks/useSearch';
import SearchBar from 'components/SearchBar';
import {getTeamOverview, getUserData, getUsersData} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';

const mapUsersToItems = (users: UserData[]): ListItem[] =>
    users.map(user => ({
        id: user.id,
        url: `/user/${user.id}`,
        navigationProps: user,
        columns: [
            {
                key: 'Team Member',
                value: '',
            },
            {
                key: 'Name',
                value: `${user.firstName} ${user.lastName}`,
            },
            {
                key: 'Display Name',
                value: user.displayName,
            },
            {
                key: 'Location',
                value: user.location,
            },
        ],
    }));

const renderTeamLeaderCard = (teamLeader: UserData) => {
    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${teamLeader.firstName} ${teamLeader.lastName}`,
        },
        {
            key: 'Display Name',
            value: teamLeader.displayName,
        },
        {
            key: 'Location',
            value: teamLeader.location,
        },
    ];
    return <Card columns={columns} url={`/user/${teamLeader.id}`} navigationProps={teamLeader} />;
};

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = useState<PageState>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {filteredItems, searchQuery, handleChange} = useSearch({
        items: pageData?.teamMembers ?? [],
        accessor: (user: UserData) => `${user.firstName} ${user.lastName}`,
    });

    const usersItems = useMemo(() => mapUsersToItems(filteredItems), [filteredItems]);

    useEffect(() => {
        const getPageData = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const [teamLead, teamMembers] = await Promise.all([
                getUserData(teamLeadId),
                getUsersData(teamMemberIds),
            ]);

            setPageData({
                teamLead,
                teamMembers,
            });
            setIsLoading(false);
        };
        getPageData();
    }, [teamId]);

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            <SearchBar
                id="users-search-bar"
                searchQuery={searchQuery}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Search team members by name"
            />
            {!isLoading && renderTeamLeaderCard(pageData.teamLead)}
            <List items={usersItems} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
