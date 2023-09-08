interface Theme {
  colors: {
    mainSkyblue: string;
    mainBlue: string;
    mainBlack: string;
    mainSalmon: string;
    mainWhite: string;
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
    transparentWhite: string;
    mint: string;
  };
  stageColors: {
    lightGreen: string;
    green: string;
    mediumGreen: string;
    darkGreen: string;
    mainSalmon: string;
    fontGreen: string;
  };
  storeColors: {
    yellow: string;
    lightYellow: string;
    gray: string;
  };
  hamsterColors: {
    cloud: string;
    main: string;
    mountain: string;
    ground: string;
  };
}

const theme: Theme = {
  colors: {
    mainSkyblue: '#EAF6FF',
    mainBlue: '#4293F7',
    mainBlack: '#2B2C2B',
    mainSalmon: '#FB796E',
    mainWhite: '#FFFFFF',
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
    transparentWhite: '#FFFFFF50',
    mint: '#47CFB0',
  },
  stageColors: {
    lightGreen: '#E5F4D3',
    green: '#ADDA7C',
    mediumGreen: '#CDE9AD',
    darkGreen: '#6FAD35',
    mainSalmon: '#FB796E',
    fontGreen: '#416922',
  },
  storeColors: {
    yellow: '#FFDF8D',
    lightYellow: '#FFF4D6',
    gray: '#D5D6D5',
  },
  hamsterColors: {
    cloud: '#FBFCF6',
    main: '#F8FAE4',
    mountain: '#F4F8CE',
    ground: '#EBF0BC',
  },
};

export default theme;
