/**
 * Simple Unit Test
 * Basic unit test to verify Jest works
 */

import { describe, it, expect } from '@jest/globals';

describe('Unit Tests', () => {
  it('should pass basic assertion', () => {
    expect(true).toBe(true);
  });

  it('should work with numbers', () => {
    expect(2 + 2).toBe(4);
  });

  it('should work with strings', () => {
    expect('hello').toBe('hello');
  });

  it('should work with objects', () => {
    expect({ a: 1, b: 2 }).toHaveProperty('a');
  });
});