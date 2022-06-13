import 'reflect-metadata';
import {pathsToModuleNameMapper} from 'ts-jest/utils'
import {compilerOptions} from './tsconfig.json'

export default {
  bail: true,
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.config.ts'],
  testMatch: ['**/*.spec.ts'],
};
