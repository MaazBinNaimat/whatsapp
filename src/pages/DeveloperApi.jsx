import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  Typography,
  Divider,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  VpnKey as KeyIcon,
  Webhook as WebhookIcon,
  Code as CodeIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { theme, commonStyles } from '../styles/theme';

const DeveloperApi = () => {
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookSecret, setWebhookSecret] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load saved API key and webhook configuration
    const savedApiKey = localStorage.getItem('apiKey');
    const savedWebhookUrl = localStorage.getItem('webhookUrl');
    const savedWebhookSecret = localStorage.getItem('webhookSecret');

    if (savedApiKey) setApiKey(savedApiKey);
    if (savedWebhookUrl) setWebhookUrl(savedWebhookUrl);
    if (savedWebhookSecret) setWebhookSecret(savedWebhookSecret);
  }, []);

  const generateApiKey = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call to generate key
      const newApiKey = `api_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
      setApiKey(newApiKey);
      localStorage.setItem('apiKey', newApiKey);
    } catch (error) {
      console.error('Error generating API key:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveWebhook = async () => {
    setIsSaving(true);
    try {
      // Validate webhook URL
      if (!webhookUrl.startsWith('https://')) {
        throw new Error('Webhook URL must use HTTPS');
      }

      // Simulate API call to save webhook configuration
      localStorage.setItem('webhookUrl', webhookUrl);
      localStorage.setItem('webhookSecret', webhookSecret);

      // Generate a new webhook secret if not set
      if (!webhookSecret) {
        const newSecret = `whsec_${Math.random().toString(36).substring(2, 15)}`;
        setWebhookSecret(newSecret);
        localStorage.setItem('webhookSecret', newSecret);
      }
    } catch (error) {
      console.error('Error saving webhook configuration:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={commonStyles.pageContainer}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Developer API</h1>
        <Tooltip title="Generate New API Key">
          <IconButton
            onClick={generateApiKey}
            disabled={isGenerating}
            style={{
              backgroundColor: theme.palette.primary.main,
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </div>

      <div className="space-y-6">
        {/* API Key Section */}
        <Card style={commonStyles.card}>
          <CardHeader
            avatar={<KeyIcon style={{ color: theme.palette.primary.main }} />}
            title="API Key"
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-gray-50 p-4 rounded-lg font-mono">
                {apiKey || 'No API key generated yet'}
              </div>
              {apiKey && (
                <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                  <IconButton
                    onClick={() => copyToClipboard(apiKey)}
                    style={{
                      backgroundColor: theme.palette.grey[200],
                      '&:hover': {
                        backgroundColor: theme.palette.grey[300],
                      },
                    }}
                  >
                    {copied ? <CheckCircleIcon style={{ color: theme.palette.primary.main }} /> : <CopyIcon />}
                  </IconButton>
                </Tooltip>
              )}
            </div>
            <Typography variant="body2" style={{ color: theme.palette.grey[600], marginTop: '8px' }}>
              Keep your API key secure. Do not share it publicly.
            </Typography>
          </CardContent>
        </Card>

        {/* Webhook Configuration */}
        <Card style={commonStyles.card}>
          <CardHeader
            avatar={<WebhookIcon style={{ color: theme.palette.secondary.main }} />}
            title="Webhook Configuration"
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent>
            <div className="space-y-4">
              <div>
                <Typography variant="subtitle2" style={{ marginBottom: '8px' }}>
                  Webhook URL
                </Typography>
                <input
                  type="url"
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="https://your-domain.com/webhook"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  style={commonStyles.input}
                />
              </div>
              <div>
                <Typography variant="subtitle2" style={{ marginBottom: '8px' }}>
                  Webhook Secret
                </Typography>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-gray-50 p-4 rounded-lg font-mono">
                    {webhookSecret || 'No webhook secret generated yet'}
                  </div>
                  {webhookSecret && (
                    <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                      <IconButton
                        onClick={() => copyToClipboard(webhookSecret)}
                        style={{
                          backgroundColor: theme.palette.grey[200],
                          '&:hover': {
                            backgroundColor: theme.palette.grey[300],
                          },
                        }}
                      >
                        {copied ? <CheckCircleIcon style={{ color: theme.palette.primary.main }} /> : <CopyIcon />}
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </div>
              <Button
                variant="contained"
                style={commonStyles.button}
                onClick={handleSaveWebhook}
                disabled={isSaving}
                startIcon={<SaveIcon />}
              >
                {isSaving ? 'Saving...' : 'Save Webhook Configuration'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Documentation */}
        <Card style={commonStyles.card}>
          <CardHeader
            avatar={<CodeIcon style={{ color: theme.palette.primary.main }} />}
            title="API Documentation"
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>
                  Authentication
                </Typography>
                <Typography variant="body2" className="font-mono">
                  curl -H "Authorization: Bearer {api_key}" https://api.whatsapp-saas.com/v1/...
                </Typography>
              </div>

              <Divider />

              <div className="bg-gray-50 p-4 rounded-lg">
                <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>
                  Send Message
                </Typography>
                <Typography variant="body2" className="font-mono">
                  POST /v1/messages
                  <br />
                  Content-Type: application/json
                  <br />
                  {`{
                    "to": "+1234567890",
                    "message": "Hello, this is a test message"
                  }`}
                </Typography>
              </div>

              <Divider />

              <div className="bg-gray-50 p-4 rounded-lg">
                <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>
                  Get Message Status
                </Typography>
                <Typography variant="body2" className="font-mono">
                  GET /v1/messages/{'{message_id}'}
                </Typography>
              </div>

              <Divider />

              <div className="bg-gray-50 p-4 rounded-lg">
                <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>
                  Webhook Events
                </Typography>
                <Typography variant="body2" className="font-mono">
                  {`{
                    "event": "message.received",
                    "data": {
                      "from": "+1234567890",
                      "message": "Hello",
                      "timestamp": "2024-04-19T12:00:00Z"
                    }
                  }`}
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeveloperApi; 