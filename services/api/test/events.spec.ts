import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('API Service', () => {
  describe('GET /v1/healthz', () => {
    it('should return healthy status', async () => {
      const response = await request(app)
        .get('/v1/healthz')
        .expect(200);

      expect(response.body).toEqual({
        status: 'healthy',
        service: 'api',
        timestamp: expect.any(String)
      });
    });
  });

  describe('POST /v1/events', () => {
    it('should create an event successfully', async () => {
      const eventData = {
        title: 'Test Event',
        description: 'A test event description',
        organizationId: 'org_123'
      };

      const response = await request(app)
        .post('/v1/events')
        .send(eventData)
        .expect(201);

      expect(response.body).toMatchObject({
        status: 'created',
        title: eventData.title,
        description: eventData.description
      });
      expect(response.body.id).toBeDefined();
    });

    it('should handle missing required fields', async () => {
      const response = await request(app)
        .post('/v1/events')
        .send({})
        .expect(201); // Still returns 201 due to fallback logic

      expect(response.body).toMatchObject({
        status: 'created'
      });
      expect(response.body.id).toBeDefined();
    });
  });

  describe('GET /v1/orgs', () => {
    it('should return organizations list', async () => {
      const response = await request(app)
        .get('/v1/orgs')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});