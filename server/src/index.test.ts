import { configureMiddleware } from './index';
import { Application } from 'express';

describe('src/index.ts', () => {
  describe('configMiddleware', () => {
    const app = ({
      use: jest.fn(() => app),
      get: jest.fn(() => app)
    } as unknown) as Application;
    it('returns app', () => {
      expect(configureMiddleware(app)).toStrictEqual(app);
    });
  });
});
