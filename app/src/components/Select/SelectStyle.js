import React from 'react';

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: '#193651',
        backgroundColor: state.isSelected ? '#F3F8FF' : 'transparent',
        padding: '5px 16px',
        margin: '0',
        fontSize: '14px',
        "&:first-of-type": {
            borderRadius: '2px 2px 0 0',
        },
        "&:hover": {
            backgroundColor: '#FFF',
        },
        "&:last-child": {
            borderBottom: 'none',
            borderRadius: '0 0 2px 2px',
        },
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        position: 'relative',
        textAlign: 'left'

    }),

    indicatorSeparator: () => {
    },

    indicatorsContainer: (provided) => ({
        ...provided,
        paddingRight: '4px'
    }),

    control: (provided) => ({
        ...provided,
        minHeight: '42px',
        fontSize: '14px',
        padding: '0',
        margin: '0',
        color: '#66615b',
        backgroundColor: '#FAFCFF',
        boxShadow: 'none',
        border: '1px solid rgba(4, 6, 71, 0.1)',
        "&:hover": {
            borderColor: 'rgba(4, 6, 71, 0.1)',
        },

    }),

    container: (provided) => ({
        ...provided,
        width: '100%',
    }),

    valueContainer: (provided) => ({
        ...provided,
        padding: '2px 8px 2px 12px'
    }),


    menu: (provided) => ({
        ...provided,
        borderRadius: '2px',
        padding: '10px 0',
        margin: '0',
        borderColor: 'red',
        width: '100%'
    }),

    dropdownIndicator: defaultStyles => ({
        ...defaultStyles,
        'svg path': {
            fill: 'rgba(24,24,24, .8)',
        },

        'svg': {
            width: '18px'
        },
    }),

    menuList: base => ({
        ...base,
        padding: 0,
        borderColor: 'red'

    }),

    placeholder: (provided) => ({
        ...provided,
        width: '100%',
        textAlign: 'left',
        whiteSpace: 'nowrap'

    }),

};

export default customStyles
