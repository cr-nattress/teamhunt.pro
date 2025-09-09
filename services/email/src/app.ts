import express from 'express';
import { supabase } from './lib/supabase';

const app = express();

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/v1/healthz', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'email',
    timestamp: new Date().toISOString()
  });
});

// Send email endpoint
app.post('/v1/send', async (req, res) => {
  try {
    const { to, subject, body, from } = req.body;
    
    // Log email request to Supabase (optional)
    try {
      await supabase
        .from('email_logs')
        .insert([
          { 
            to,
            subject,
            from: from || 'noreply@teamhunt.pro',
            status: 'queued',
            created_at: new Date().toISOString()
          }
        ]);
    } catch (logError) {
      console.log('Email logging failed:', logError);
      // Continue even if logging fails
    }

    // TODO: Integrate with actual email service (SendGrid, Mailgun, etc.)
    console.log('Email queued:', { to, subject, from });
    
    res.json({ 
      status: 'queued', 
      to,
      subject,
      messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ 
      error: 'Failed to send email' 
    });
  }
});

export default app;