function customStylesStatusGalangDana(statusGalangDana) {
  return {
    option: (provided, state) => ({
      ...provided,
      border: '1px solid #F4F4F4',
      color: state.isSelected ? 'white' : 'black',
      padding: 10,
      zIndex: 99999,
      backgroundColor: state.isSelected ? '#E7513B' : 'white',
    }),
    control: (provided) => ({
      ...provided,
      height: '50px',
      width: '152px',
      paddingLeft: 5,
      paddingRight: 0,
      borderRadius: '30px',
      border:
        statusGalangDana === 'Pending' && '2px solid rgba(252, 174, 3, 0.2)',
      backgroundColor: 'transparent',
      color: '#FCAE03',
      font: 'root.font.regular',
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
}

function customStyles(detailTarikDana) {
  return {
    option: (provided, state) => ({
      ...provided,
      border: '1px solid #F4F4F4',
      color: state.isSelected ? 'white' : 'black',
      padding: 10,
      zIndex: 99999,
      backgroundColor: state.isSelected ? '#E7513B' : 'white',
    }),
    control: (provided) => ({
      ...provided,
      height: '50px',
      width: '152px',
      paddingLeft: 5,
      paddingRight: 0,
      borderRadius: '30px',
      border:
        detailTarikDana.status === 'pending' &&
        '2px solid rgba(252, 174, 3, 0.2)',
      backgroundColor:
        detailTarikDana.status === 'pending' && 'rgba(252, 174, 3, 0.2)',
      color: '#FCAE03',
      font: 'root.font.regular',
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
}

export { customStyles, customStylesStatusGalangDana }
