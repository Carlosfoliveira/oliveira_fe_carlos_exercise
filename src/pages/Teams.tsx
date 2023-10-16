import React, {useState, useMemo, useEffect} from 'react';
import {ListItem, Team} from 'types';
import SearchBar from 'components/SearchBar';
import {useSearch} from 'hooks/useSearch';
import {getTeams as fetchTeams} from '../api';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

const mapTeamsToItems = (teams: Team[]): ListItem[] =>
    teams.map(team => ({
        id: team.id,
        url: `/team/${team.id}`,
        columns: [
            {
                key: 'Name',
                value: team.name,
            },
        ],
        navigationProps: team,
    }));

const Teams = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {filteredItems, searchQuery, handleChange} = useSearch({
        items: teams,
        accessor: (team: Team) => team.name,
    });

    const filteredTeamItems = useMemo(() => mapTeamsToItems(filteredItems), [filteredItems]);

    useEffect(() => {
        const getTeams = async () => {
            const data = await fetchTeams();
            setTeams(data);
            setIsLoading(false);
        };
        getTeams();
    }, []);

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <SearchBar
                id="teams-search-bar"
                searchQuery={searchQuery}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Search teams by name"
            />
            <List items={filteredTeamItems} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
