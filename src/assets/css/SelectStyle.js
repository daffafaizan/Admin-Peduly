export const customStyles = {
    option: (provided, state) => ({
        ...provided,
        border: '1px solid #F4F4F4',
        color: state.isSelected ? 'white' : 'black',
        padding: 10,
        zIndex: 99999,
        fontSize: '14px',
        backgroundColor: state.isSelected ? '#E7513B' : 'white',
    }),
    control: (provided) => ({
        ...provided,
        height: '50px',
        width: '300px',
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        borderRadius: 0,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: '1px solid #f4f4f4',
        backgroundColor: 'transparent',
        color: '#FCAE03',
        font: 'root.font.regular',
        fontSize: '16px',
        marginTop: 1,
        boxShadow: '0 !important',
        '&:hover': {
            outline: 'none !important',
            borderColor: 'rgba(0, 0, 0, 0.3)',
        },
        '&:focus': {
            outline: 'auto 2px Highlight !important',
        },
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1
        const transition = 'opacity 300ms'
        return { ...provided, opacity, transition }
    },
}

export const penggunaSelect = {
    option: (provided, state) => ({
        ...provided,
        border: '1px solid #F4F4F4',
        color: state.isSelected ? 'white' : 'black',
        padding: 10,
        zIndex: 99999,
        fontSize: '14px',
        backgroundColor: state.isSelected ? '#E7513B' : 'white',
    }),
    control: (provided) => ({
        ...provided,
        height: '50px',
        width: '250px',
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        borderRadius: 0,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: '1px solid #f4f4f4',
        backgroundColor: 'transparent',
        color: '#FCAE03',
        font: 'root.font.regular',
        fontSize: '16px',
        marginTop: 0,
        boxShadow: '0 !important',
        '&:hover': {
            outline: 'none !important',
            borderColor: 'rgba(0, 0, 0, 0.3)',
        },
        '&:focus': {
            outline: 'auto 2px Highlight !important',
        },
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1
        const transition = 'opacity 300ms'
        return { ...provided, opacity, transition }
    },
}

