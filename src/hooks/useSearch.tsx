import React, {ChangeEventHandler, useCallback, useMemo, useState} from 'react';

interface Props<T> {
    items: T[];
    initialSearchQuery?: string;
    accessor?: (item: T) => string;
}

interface useSearchValue<T> {
    filteredItems: T[];
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    handleChange: ChangeEventHandler<HTMLInputElement>;
}

function defaultAccessor<T>(item: T) {
    return String(item);
}

export function useSearch<T>(props: Props<T>): useSearchValue<T> {
    const {items, initialSearchQuery = '', accessor: accessorProps} = props;
    const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

    const filteredItems = useMemo(() => {
        const regex = new RegExp(searchQuery, 'ig');
        const accessor = accessorProps ?? defaultAccessor;

        return items.filter(item => accessor(item).match(regex));
    }, [searchQuery, items, accessorProps]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
        setSearchQuery(e.target.value);
    }, []);

    const value = useMemo(
        () => ({
            filteredItems,
            searchQuery,
            setSearchQuery,
            handleChange,
        }),
        [filteredItems, handleChange, searchQuery]
    );

    if (items.length && typeof items[0] === 'object' && !accessorProps) {
        throw new Error('Should pass an accessor prop if the typeof item is object');
    }

    return value;
}
