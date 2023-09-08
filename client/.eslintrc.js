module.exports = {
  parser: '@typescript-eslint/parser', // TypeScript용 ESLint 파서를 사용하여 코드를 분석
  plugins: ['@typescript-eslint', 'prettier'], // TypeScript 관련 규칙과 Prettier 플러그인 사용
  extends: [
    'airbnb', // Airbnb 스타일 가이드를 기반으로 코드 스타일
    'plugin:react/recommended', // React 관련 규칙
    'plugin:jsx-a11y/recommended', // JSX Accessibility 규칙
    'plugin:import/errors', // import 문 관련 규칙
    'plugin:import/warnings', // import 문 관련 규칙
    'plugin:@typescript-eslint/recommended', // TypeScript 관련 ESLint 규칙
    'plugin:prettier/recommended', // Prettier와 관련된 규칙
  ],
  rules: {
    'linebreak-style': 0, // 줄바꿈 스타일과 관련된 규칙을 무시
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/function-component-definition': [
      2,
      { namedComponents: ['arrow-function', 'function-declaration'] },
    ],
    'import/prefer-default-export': 0, // 모듈에서 named export를 사용하더라도, default export를 선호하는 규칙을 무시
    'import/extensions': 0, // 파일 확장자와 관련된 규칙을 무시
    'no-use-before-define': 0, // 변수나 함수를 정의하기 전에 사용하는 것을 허용
    'import/no-unresolved': 0, // 모듈 경로가 해석되지 않는 경우에 대한 경고를 표시하지 않음
    'react/react-in-jsx-scope': 0, // JSX를 사용할 때 React 객체를 불러오지 않아도 되도록 허용
    'import/no-extraneous-dependencies': 0, // 개발 의존성(devDependencies) 중에서 불필요한 의존성에 대한 경고를 표시하지 않음
    'react/prop-types': 0, // PropTypes를 사용하지 않아도 되도록 허용
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ], // JSX를 사용하는 파일 확장자를 명시 / .js, .jsx, .ts, .tsx 확장자를 가진 파일에서만 JSX 사용을 허용
    'jsx-a11y/no-noninteractive-element-interactions': 0, // 사용자와의 상호작용이 없는 요소에 이벤트 핸들러를 사용해도 경고를 표시하지 않음
    '@typescript-eslint/explicit-module-boundary-types': 0, // TypeScript에서 함수의 반환 타입을 명시적으로 선언하지 않아도 되도록 허용
  },
  settings: {
    'import/resolver': {
      // 모듈 리졸버 설정을 지정 / 모듈 경로를 어떻게 해석할지 결정
      node: {
        // Node.js에서 기본적으로 제공되는 모듈 리졸버를 사용
        extensions: ['.js', '.jsx', '.ts', '.tsx'], //  import 문에서 해당 확장자를 생략하더라도 파일을 올바르게 해석
      },
    },
  },
};
