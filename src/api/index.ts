import {Team, TeamOverview, UserData} from 'types';

const getData = async (path = '') => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/${path}`;
    const res = await fetch(url);
    const json = await res.json();

    return json;
};

export const getTeams = (): Promise<Team[]> => {
    return getData('teams');
};

export const getTeamOverview = (teamId: string): Promise<TeamOverview> => {
    return getData(`teams/${teamId}`);
};

export const getUserData = (userId: string): Promise<UserData> => {
    return getData(`users/${userId}`);
};

export const getUsersData = async (userIds: string[]): Promise<UserData[]> => {
    const teamUsers = [];
    const usersPromises = userIds.map(id => getUserData(id).then(res => teamUsers.push(res)));
    await Promise.all(usersPromises);

    return teamUsers;
};
