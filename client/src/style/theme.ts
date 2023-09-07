interface Theme {
  colors: {
    mainSkyblue: string;
    mainBlue: string;
    mainBlack: string;
    mainSalmon: string;
    lightPurple: string;
    purple: string;
    lightGray: string;
    mainGray: string;
    darkGray: string;
    lightGreen: string;
    green: string;
    darkGreen: string;
    lightSalmon: string;
    barLightYellow: string;
    barYellow: string;
  };
  menuColors: {
    pink: string;
    borderPink: string;
    green: string;
    borderGreen: string;
    yellow: string;
    blue: string;
  };
  stageColors: {
    lightGreen: string;
    green: string;
    darkGreen: string;
    mainSalmon: string;
    fontGreen: string;
  };
  hamsterColors: {
    cloud: string;
    main: string;
    mountain: string;
    ground: string;
  };
  //   typography: {
  //     fontFamily: string;
  //     fontSize: string;
  //   };
  //   spacing: {
  //     padding: string;
  //     margin: string;
  //   };
}

const theme: Theme = {
  colors: {
    mainSkyblue: '#EAF6FF',
    mainBlue: '#4293F7',
    mainBlack: '#2B2C2B',
    mainSalmon: '#FB796E',
    lightPurple: '#F5F5FF',
    purple: '#D6D6FE',
    lightGray: '#EDEDED',
    mainGray: '#BBBBBB',
    darkGray: '#676767',
    lightGreen: '#F4F6ED',
    green: '#E2EDD3',
    darkGreen: '#D1DFBC',
    lightSalmon: '#FFEBE2',
    barLightYellow: '#FFEFC6',
    barYellow: '#FFC64A',
  },
  menuColors: {
    pink: '#FAB8D1',
    borderPink: '#FF7DA5',
    green: '#9EDF80',
    borderGreen: '#00C300',
    yellow: '#FAE77F',
    blue: '#9BC3FA',
  },
  stageColors: {
    lightGreen: '#E5F4D3',
    green: '#ADDA7C',
    darkGreen: '#6FAD35',
    mainSalmon: '#FB796E',
    fontGreen: '#416922',
  },
  hamsterColors: {
    cloud: '#FBFCF6',
    main: '#F8FAE4',
    mountain: '#F4F8CE',
    ground: '#EBF0BC',
  },
  //   typography: {
  //     fontFamily: 'Arial, sans-serif',
  //     fontSize: '16px',
  //   },
  //   spacing: {
  //     padding: '10px',
  //     margin: '10px',
  //   },
};

export default theme;
