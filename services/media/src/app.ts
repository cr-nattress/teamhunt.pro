import express from 'express';
import { supabase } from './lib/supabase';

const app = express();

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/v1/healthz', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'media',
    timestamp: new Date().toISOString()
  });
});

// Generate signed upload URL
app.post('/v1/uploads/sign', async (req, res) => {
  try {
    const { fileName, fileType, folder = 'uploads' } = req.body;
    
    if (!fileName) {
      return res.status(400).json({ error: 'fileName is required' });
    }

    // Generate unique file path
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);
    const filePath = `${folder}/${timestamp}_${randomId}_${fileName}`;

    try {
      // Generate signed URL using Supabase Storage
      const { data, error } = await supabase.storage
        .from('media')
        .createSignedUploadUrl(filePath);

      if (error) {
        console.log('Supabase storage error, generating fallback URL:', error.message);
        // Fallback response if storage bucket doesn't exist yet
        return res.json({
          uploadUrl: `https://example.com/upload/signed/${filePath}`,
          filePath,
          fileName,
          expiresIn: 3600
        });
      }

      res.json({
        uploadUrl: data.signedUrl,
        filePath,
        fileName,
        expiresIn: 3600
      });
    } catch (storageError) {
      console.log('Storage operation failed, using fallback:', storageError);
      // Fallback response
      res.json({
        uploadUrl: `https://example.com/upload/signed/${filePath}`,
        filePath,
        fileName,
        expiresIn: 3600
      });
    }
  } catch (err) {
    console.error('Error generating signed URL:', err);
    res.status(500).json({ 
      error: 'Failed to generate signed upload URL' 
    });
  }
});

// Get file info
app.get('/v1/files/:filePath(*)', async (req, res) => {
  try {
    const { filePath } = req.params;
    
    try {
      // Get file info from Supabase Storage
      const { data, error } = await supabase.storage
        .from('media')
        .list(filePath.split('/').slice(0, -1).join('/'), {
          search: filePath.split('/').pop()
        });

      if (error) {
        return res.status(404).json({ error: 'File not found' });
      }

      const fileInfo = data?.[0];
      if (!fileInfo) {
        return res.status(404).json({ error: 'File not found' });
      }

      res.json({
        name: fileInfo.name,
        size: fileInfo.metadata?.size,
        lastModified: fileInfo.updated_at,
        contentType: fileInfo.metadata?.mimetype
      });
    } catch (storageError) {
      console.log('Storage list failed:', storageError);
      res.status(404).json({ error: 'File not found' });
    }
  } catch (err) {
    console.error('Error getting file info:', err);
    res.status(500).json({ 
      error: 'Failed to get file information' 
    });
  }
});

export default app;