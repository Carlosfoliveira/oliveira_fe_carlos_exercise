import {renderHook} from '@testing-library/react';
import {useSearch} from 'hooks/useSearch';

const mockItems = ['Apple', 'Banana', 'Cherry'];
const mockObjectItems = [{name: 'Apple'}, {name: 'Banana'}, {name: 'Orange'}];

describe('useSearch', () => {
    it('initializes with empty search query and returns items as-is', () => {
        const {result} = renderHook(() => useSearch({items: mockItems}));

        expect(result.current.searchQuery).toBe('');
        expect(result.current.filteredItems).toEqual(mockItems);
    });

    it('correctly filters items based on the search query', () => {
        const initialSearchQuery = 'an';

        const {result} = renderHook(() => useSearch({items: mockItems, initialSearchQuery}));

        expect(result.current.searchQuery).toBe('an');
        expect(result.current.filteredItems).toEqual(['Banana']);
    });

    it('handles custom accessor function', () => {
        const initialSearchQuery = 'b';
        const accessor = item => item.name;

        const {result} = renderHook(() =>
            useSearch({items: mockObjectItems, initialSearchQuery, accessor})
        );

        expect(result.current.searchQuery).toBe('b');
        expect(result.current.filteredItems).toEqual([{name: 'Banana'}]);
    });

    it('throws an error when using objects without an accessor', () => {
        expect(() => renderHook(() => useSearch({items: mockObjectItems}))).toThrow(
            'Should pass an accessor prop if the typeof item is object'
        );
    });
});
