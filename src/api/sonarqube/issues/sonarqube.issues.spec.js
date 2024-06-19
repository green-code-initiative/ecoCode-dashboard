import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest';
import findIssues from './sonarqube.issues'

const BEFORE_ALL_TIMEOUT = 30000; // 30 sec

describe('findIssues', () => {
  test('findIssues retrieve 1 issue', () => {
    expect(findIssues('foo', 'js', 'master')).toBe(1)
  })
})

describe('Request Earth Polychromatic Imaging Camera', () => {
    let response;
    let body;
  
    beforeAll(async () => {
      response = await findIssues('foo', 'js', 'master');
      body = await response.json();
    }, BEFORE_ALL_TIMEOUT);
  
    test('Should have response status 200', () => {
      expect(response.status).toBe(200);
    });
  
    test('Should have content-type', () => {
      expect(response.headers.get('Content-Type')).toBe('application/json');
    });
  
    test('Should have array in the body', () => {
      expectTypeOf(body).toBeArray();
    });
  
    test('The first item in array should contain EPIC in caption key', () => {
      expect(body[0].caption).to.have.string('EPIC');
    });
  });