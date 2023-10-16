import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import SearchBar from '..';

const onChangeMock = jest.fn();

describe('SearchBar', () => {
    it('renders SearchBar component with provided props', async () => {
        render(<SearchBar id="some-id" searchQuery="some query" onChange={onChangeMock} />);

        const inputElement = await screen.findByTestId('search-input-some-id');

        expect(inputElement).toHaveAttribute('value', 'some query');
        expect(inputElement).not.toHaveAttribute('disabled');
    });

    it('renders SearchBar component with disabled prop', async () => {
        render(
            <SearchBar id="some-id" searchQuery="some query" onChange={onChangeMock} disabled />
        );

        const inputElement = await screen.findByTestId('search-input-some-id');

        expect(inputElement).toHaveAttribute('disabled');
    });

    it('triggers onChange callback when input value changes', async () => {
        render(<SearchBar id="some-id" searchQuery="some query" onChange={onChangeMock} />);

        const inputElement = await screen.findByTestId('search-input-some-id');
        fireEvent.change(inputElement, {target: {value: 'new query'}});

        expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
});
