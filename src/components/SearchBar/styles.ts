import styled from 'styled-components';

export const SearchLabel = styled.label``;

export const SearchInput = styled.input`
    width: 250px;
    height: 35px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    padding: 0 10px;
    margin-bottom: 20px;
    margin-left: 5px;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    &::-webkit-search-cancel-button {
        cursor: pointer;
    }
`;
