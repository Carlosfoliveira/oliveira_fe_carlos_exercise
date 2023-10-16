import styled from 'styled-components';

export const Container = styled.div<{hasNavigation: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: #ddd;
    padding: 20px;
    width: 250px;
    max-height: 200px;
    cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
    margin: 5px;
    min-height: 40px;
    border-radius: 10px;

    &:hover {
        opacity: 0.8;
    }
`;
