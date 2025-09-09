import express from 'express';
import { supabase } from './lib/supabase';

const app = express();

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/v1/healthz', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'api',
    timestamp: new Date().toISOString()
  });
});

// Organizations endpoint with Supabase query example
app.get('/v1/orgs', async (req, res) => {
  try {
    // Example query - replace with actual table when schema is ready
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .limit(10);

    if (error) {
      console.log('Supabase query failed, returning demo data:', error.message);
      // Fallback to demo data if table doesn't exist yet
      return res.json({ 
        data: [{ id: "org_demo", name: "Demo Org" }] 
      });
    }

    res.json({ data });
  } catch (err) {
    console.error('Error fetching organizations:', err);
    res.status(500).json({ 
      error: 'Failed to fetch organizations',
      data: [{ id: "org_demo", name: "Demo Org" }] // Fallback
    });
  }
});

// Events endpoint with Supabase insert
app.post('/v1/events', async (req, res) => {
  try {
    const { title, description, organizationId } = req.body;
    
    // Example insert - replace with actual table when schema is ready
    const { data, error } = await supabase
      .from('events')
      .insert([
        { 
          title, 
          description, 
          organization_id: organizationId,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.log('Supabase insert failed, returning demo response:', error.message);
      // Fallback response if table doesn't exist yet
      return res.status(201).json({ 
        id: "event_123", 
        status: "created",
        title,
        description 
      });
    }

    res.status(201).json({ 
      id: data.id, 
      status: "created",
      ...data
    });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ 
      error: 'Failed to create event' 
    });
  }
});

export default app;