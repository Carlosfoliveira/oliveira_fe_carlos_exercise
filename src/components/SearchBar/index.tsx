import React, {ChangeEvent} from 'react';
import {SearchInput, SearchLabel} from './styles';

interface Props {
    id: string;
    searchQuery: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    placeholder?: string;
}

const SearchBar = (props: Props) => {
    const {id, searchQuery, onChange, disabled = false, placeholder = 'Search...'} = props;

    return (
        <SearchLabel htmlFor={id}>
            Search:
            <SearchInput
                data-testid={`search-input-${id}`}
                type="search"
                name={id}
                id={id}
                placeholder={placeholder}
                value={searchQuery}
                onChange={onChange}
                disabled={disabled}
            />
        </SearchLabel>
    );
};

export default SearchBar;
