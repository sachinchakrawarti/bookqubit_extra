/**
 * Simple Test - ES6
 * Basic test to verify Jest is working
 */

import { describe, it, expect } from '@jest/globals';

describe('Simple Test Suite', () => {
  it('should pass a basic test', () => {
    expect(true).toBe(true);
  });

  it('should add numbers correctly', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle strings', () => {
    const greeting = 'Hello, World!';
    expect(greeting).toBe('Hello, World!');
    expect(greeting.length).toBeGreaterThan(0);
  });

  it('should work with objects', () => {
    const obj = { name: 'test', value: 42 };
    expect(obj).toHaveProperty('name');
    expect(obj.name).toBe('test');
    expect(obj.value).toBe(42);
  });
});