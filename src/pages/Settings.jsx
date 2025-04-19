import React, { useState } from 'react';
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
} from '@mui/material';
import {
  WhatsApp as WhatsAppIcon,
  Storage as CrmIcon,
  Web as WebIcon,
  Settings as SettingsIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { theme, commonStyles } from '../styles/theme';

const Settings = () => {
  const [settings, setSettings] = useState({
    apiKey: '',
    crmConnected: false,
    webScraping: false,
    routingRules: [
      {
        id: 1,
        condition: 'language',
        value: 'English',
        action: 'assign',
        target: 'Agent 1',
      },
      {
        id: 2,
        condition: 'time',
        value: '9:00-17:00',
        action: 'assign',
        target: 'Agent 2',
      },
    ],
  });

  const [newRule, setNewRule] = useState({
    condition: '',
    value: '',
    action: '',
    target: '',
  });

  const handleSave = () => {
    // Handle settings save
    console.log('Settings saved:', settings);
  };

  const handleAddRule = () => {
    if (newRule.condition && newRule.value && newRule.action && newRule.target) {
      setSettings({
        ...settings,
        routingRules: [
          ...settings.routingRules,
          {
            id: settings.routingRules.length + 1,
            ...newRule,
          },
        ],
      });
      setNewRule({
        condition: '',
        value: '',
        action: '',
        target: '',
      });
    }
  };

  const handleDeleteRule = (id) => {
    setSettings({
      ...settings,
      routingRules: settings.routingRules.filter((rule) => rule.id !== id),
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(settings.routingRules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSettings({
      ...settings,
      routingRules: items,
    });
  };

  return (
    <div style={commonStyles.pageContainer}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button
          variant="contained"
          style={commonStyles.button}
          onClick={handleSave}
          startIcon={<SaveIcon />}
        >
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        {/* WhatsApp API Settings */}
        <Card style={commonStyles.card}>
          <CardHeader
            avatar={<WhatsAppIcon style={{ color: theme.palette.primary.main }} />}
            title="WhatsApp API Settings"
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent>
            <TextField
              fullWidth
              label="API Key"
              value={settings.apiKey}
              onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              style={commonStyles.input}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="outlined"
                    style={{
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                    }}
                  >
                    Generate New API Key
                  </Button>
                ),
              }}
            />
          </CardContent>
        </Card>

        {/* CRM Integration */}
        <Card style={commonStyles.card}>
          <CardHeader
            avatar={<CrmIcon style={{ color: theme.palette.secondary.main }} />}
            title="CRM Integration"
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <Tooltip title={settings.crmConnected ? 'Disconnect CRM' : 'Connect CRM'}>
                <IconButton
                  onClick={() => setSettings({ ...settings, crmConnected: !settings.crmConnected })}
                >
                  {settings.crmConnected ? (
                    <ToggleOnIcon style={{ color: theme.palette.primary.main }} />
                  ) : (
                    <ToggleOffIcon style={{ color: theme.palette.grey[400] }} />
                  )}
                </IconButton>
              </Tooltip>
            }
          />
          <CardContent>
            {settings.crmConnected && (
              <Fade in={settings.crmConnected}>
                <div>
                  <TextField
                    fullWidth
                    label="Google Sheets URL"
                    style={commonStyles.input}
                  />
                  <Button
                    variant="outlined"
                    style={{
                      marginTop: '16px',
                      borderColor: theme.palette.secondary.main,
                      color: theme.palette.secondary.main,
                    }}
                  >
                    Authorize Google Sheets
                  </Button>
                </div>
              </Fade>
            )}
          </CardContent>
        </Card>

        {/* Routing Rules */}
        <Card style={commonStyles.card}>
          <CardHeader
            avatar={<SettingsIcon style={{ color: theme.palette.primary.main }} />}
            title="Routing Rules"
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <TextField
                select
                label="Condition"
                value={newRule.condition}
                onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                style={commonStyles.input}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select Condition</option>
                <option value="language">Language</option>
                <option value="time">Time</option>
                <option value="priority">Priority</option>
              </TextField>

              <TextField
                label="Value"
                value={newRule.value}
                onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                style={commonStyles.input}
              />

              <TextField
                select
                label="Action"
                value={newRule.action}
                onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
                style={commonStyles.input}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select Action</option>
                <option value="assign">Assign to</option>
                <option value="forward">Forward to</option>
                <option value="notify">Notify</option>
              </TextField>

              <TextField
                label="Target"
                value={newRule.target}
                onChange={(e) => setNewRule({ ...newRule, target: e.target.value })}
                style={commonStyles.input}
              />
            </div>

            <Button
              variant="contained"
              style={commonStyles.button}
              onClick={handleAddRule}
              startIcon={<AddIcon />}
            >
              Add Rule
            </Button>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="rules">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="mt-6"
                  >
                    {settings.routingRules.map((rule, index) => (
                      <Draggable key={rule.id} draggableId={rule.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-2"
                          >
                            <div {...provided.dragHandleProps}>
                              <DragIcon style={{ color: theme.palette.grey[400] }} />
                            </div>
                            <div className="flex-1 grid grid-cols-4 gap-4">
                              <span>{rule.condition}</span>
                              <span>{rule.value}</span>
                              <span>{rule.action}</span>
                              <span>{rule.target}</span>
                            </div>
                            <IconButton
                              onClick={() => handleDeleteRule(rule.id)}
                              style={{ color: theme.palette.error.main }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
        </Card>

        {/* Web Scraping */}
        <Card style={commonStyles.card}>
          <CardHeader
            avatar={<WebIcon style={{ color: theme.palette.secondary.main }} />}
            title="Web Scraping"
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <Tooltip title={settings.webScraping ? 'Disable Web Scraping' : 'Enable Web Scraping'}>
                <IconButton
                  onClick={() => setSettings({ ...settings, webScraping: !settings.webScraping })}
                >
                  {settings.webScraping ? (
                    <ToggleOnIcon style={{ color: theme.palette.primary.main }} />
                  ) : (
                    <ToggleOffIcon style={{ color: theme.palette.grey[400] }} />
                  )}
                </IconButton>
              </Tooltip>
            }
          />
          <CardContent>
            {settings.webScraping && (
              <Fade in={settings.webScraping}>
                <div>
                  <TextField
                    fullWidth
                    label="Website URL"
                    style={commonStyles.input}
                  />
                  <TextField
                    fullWidth
                    label="CSS Selector"
                    placeholder="e.g., .product-price"
                    style={{ ...commonStyles.input, marginTop: '16px' }}
                  />
                </div>
              </Fade>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings; 