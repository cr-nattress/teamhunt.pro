import { test, expect } from '@playwright/test';

// Environment variables for different service endpoints
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8888';
const EMAIL_BASE_URL = process.env.EMAIL_BASE_URL || 'http://localhost:8889';
const MEDIA_BASE_URL = process.env.MEDIA_BASE_URL || 'http://localhost:8890';

test.describe('API Health Checks', () => {
  test('API service health check', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/v1/healthz`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('status', 'healthy');
    expect(body).toHaveProperty('service', 'api');
    expect(body).toHaveProperty('timestamp');
  });

  test('Email service health check', async ({ request }) => {
    const response = await request.get(`${EMAIL_BASE_URL}/v1/healthz`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('status', 'healthy');
    expect(body).toHaveProperty('service', 'email');
    expect(body).toHaveProperty('timestamp');
  });

  test('Media service health check', async ({ request }) => {
    const response = await request.get(`${MEDIA_BASE_URL}/v1/healthz`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('status', 'healthy');
    expect(body).toHaveProperty('service', 'media');
    expect(body).toHaveProperty('timestamp');
  });
});

test.describe('API Core Functionality', () => {
  test('GET /v1/orgs returns organizations', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/v1/orgs`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
    
    // Should have at least the demo org
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty('id');
    expect(body.data[0]).toHaveProperty('name');
  });

  test('POST /v1/events creates an event', async ({ request }) => {
    const eventData = {
      title: 'Test Event',
      description: 'A test event for E2E testing',
      organizationId: 'org_demo'
    };

    const response = await request.post(`${API_BASE_URL}/v1/events`, {
      data: eventData
    });
    
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('status', 'created');
    expect(body).toHaveProperty('title', eventData.title);
    expect(body).toHaveProperty('description', eventData.description);
  });
});

test.describe('Email Service', () => {
  test('POST /v1/send queues email', async ({ request }) => {
    const emailData = {
      to: 'test@example.com',
      subject: 'Test Email',
      body: 'This is a test email from E2E tests',
      from: 'test@teamhunt.pro'
    };

    const response = await request.post(`${EMAIL_BASE_URL}/v1/send`, {
      data: emailData
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('status', 'queued');
    expect(body).toHaveProperty('to', emailData.to);
    expect(body).toHaveProperty('subject', emailData.subject);
    expect(body).toHaveProperty('messageId');
  });
});

test.describe('Media Service', () => {
  test('POST /v1/uploads/sign generates signed upload URL', async ({ request }) => {
    const uploadData = {
      fileName: 'test-image.jpg',
      fileType: 'image/jpeg',
      folder: 'test-uploads'
    };

    const response = await request.post(`${MEDIA_BASE_URL}/v1/uploads/sign`, {
      data: uploadData
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('uploadUrl');
    expect(body).toHaveProperty('filePath');
    expect(body).toHaveProperty('fileName', uploadData.fileName);
    expect(body).toHaveProperty('expiresIn');
  });

  test('POST /v1/uploads/sign requires fileName', async ({ request }) => {
    const uploadData = {
      fileType: 'image/jpeg'
    };

    const response = await request.post(`${MEDIA_BASE_URL}/v1/uploads/sign`, {
      data: uploadData
    });
    
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('error', 'fileName is required');
  });
});