// const hq = require('alias-hq')

module.exports = {
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "json"],
    transform: {
        '^.+\\.(ts)?$': 'ts-jest',
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    testEnvironment: 'jsdom',
    testMatch: [
        '<rootDir>/**/*.test.(js|jsx|ts|tsx)', '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
    ],
//   transform: {
//     '^.+\\.jsx?$': 'babel-jest',
//   },
//   moduleNameMapper: {
//     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
//       '<rootDir>/__mocks__/fileMock.js',
//     '\\.(css|scss)$': 'identity-obj-proxy',
//   },
//   clearMocks: true,
//   coverageDirectory: 'coverage',
//   globals: {
// },
//   transform: {
//     "\\.[jt]sx?$":  [ 'esbuild-jest', { 
//         loaders: {
//           '.spec.js': 'jsx',
//           '.js': 'jsx'
//         }
//       }
//     ]
//   },
  /// This will resolve any tsconfig.compilerOptions.paths
//   moduleNameMapper: hq.get('jest'),
//   testPathIgnorePatterns: ['/node_modules/', '/src/', '/types/' ],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}