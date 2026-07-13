/**
 * Geography Module Tests
 * Tests for the geography module
 */

import { describe, it, expect } from '@jest/globals';
import { MODULE, config } from '../index.js';

describe('Geography Module', () => {
  describe('Module Configuration', () => {
    it('should have correct module info', () => {
      expect(MODULE).toBeDefined();
      expect(MODULE.name).toBe('geography');
      expect(MODULE.version).toBe('1.0.0');
      expect(MODULE.description).toBeDefined();
      expect(MODULE.author).toBe('BookQbit Team');
    });

    it('should have configuration', () => {
      expect(config).toBeDefined();
    });
  });

  describe('Module Functions', () => {
    it('should have module health check', async () => {
      const module = await import('../index.js');
      expect(module.getModuleHealth).toBeDefined();
      expect(typeof module.getModuleHealth).toBe('function');
    });

    it('should have init module function', async () => {
      const module = await import('../index.js');
      expect(module.initModule).toBeDefined();
      expect(typeof module.initModule).toBe('function');
    });

    it('should have shutdown module function', async () => {
      const module = await import('../index.js');
      expect(module.shutdownModule).toBeDefined();
      expect(typeof module.shutdownModule).toBe('function');
    });
  });

  describe('Module Exports', () => {
    it('should have models', async () => {
      const module = await import('../index.js');
      expect(module.Country).toBeDefined();
      expect(module.State).toBeDefined();
      expect(module.City).toBeDefined();
      expect(module.Continent).toBeDefined();
    });

    it('should have repositories', async () => {
      const module = await import('../index.js');
      expect(module.CountryRepository).toBeDefined();
      expect(module.StateRepository).toBeDefined();
      expect(module.CityRepository).toBeDefined();
    });

    it('should have services', async () => {
      const module = await import('../index.js');
      expect(module.CountryPublicService).toBeDefined();
      expect(module.StatePublicService).toBeDefined();
      expect(module.CityPublicService).toBeDefined();
    });

    it('should have controllers', async () => {
      const module = await import('../index.js');
      expect(module.CountryController).toBeDefined();
      expect(module.StateController).toBeDefined();
      expect(module.CityController).toBeDefined();
    });

    it('should have routes', async () => {
      const module = await import('../index.js');
      expect(module.routes).toBeDefined();
      expect(module.geographyRoutes).toBeDefined();
    });
  });
});