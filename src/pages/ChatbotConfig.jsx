import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  DragIndicator as DragIcon,
  Send as SendIcon,
  Message as MessageIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { theme, commonStyles } from '../styles/theme';

const ChatbotConfig = () => {
  const [blocks, setBlocks] = useState([
    {
      id: '1',
      type: 'welcome',
      content: 'Welcome to our WhatsApp service! How can I help you today?',
    },
    {
      id: '2',
      type: 'menu',
      content: 'Please select an option:\n1. Order Status\n2. Product Info\n3. Support',
    },
  ]);

  const [previewMessage, setPreviewMessage] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBlock, setNewBlock] = useState({
    type: 'message',
    content: '',
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBlocks(items);
  };

  const handleAddBlock = () => {
    if (newBlock.content.trim()) {
      setBlocks([
        ...blocks,
        {
          id: Date.now().toString(),
          ...newBlock,
        },
      ]);
      setNewBlock({ type: 'message', content: '' });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteBlock = (id) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
    // Simulate conversation flow
    let message = '';
    blocks.forEach((block) => {
      message += `Bot: ${block.content}\n\n`;
    });
    setPreviewMessage(message);
  };

  const blockStyles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      p: 2,
      bgcolor: 'background.default',
      borderRadius: 2,
      mb: 2,
      transition: 'all 0.2s ease',
      '&:hover': {
        bgcolor: 'action.hover',
        transform: 'translateX(4px)',
      },
    },
    dragHandle: {
      color: 'text.secondary',
      mr: 2,
    },
    content: {
      flex: 1,
    },
    deleteButton: {
      color: 'error.main',
      '&:hover': {
        bgcolor: 'error.light',
      },
    },
  };

  return (
    <Box sx={{ 
      p: 2,
      height: '100%',
      overflow: 'auto',
      '& .MuiCard-root': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      '& .MuiCardContent-root': {
        flex: 1,
        p: 2,
      },
      '& .MuiCardHeader-root': {
        p: 2,
      }
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          Chatbot Configuration
        </Typography>
        <Button
          variant="contained"
          sx={commonStyles.button}
          onClick={handlePreview}
          startIcon={<MessageIcon />}
        >
          Preview Chat
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={commonStyles.card}>
            <CardHeader
              title="Chatbot Flow"
              titleTypographyProps={{ variant: 'h6' }}
              action={
                <Tooltip title="Add New Block">
                  <IconButton
                    onClick={() => setIsAddDialogOpen(true)}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                      },
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <CardContent>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="blocks">
                  {(provided) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {blocks.map((block, index) => (
                        <Draggable
                          key={block.id}
                          draggableId={block.id}
                          index={index}
                        >
                          {(provided) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              sx={blockStyles.container}
                            >
                              <Box {...provided.dragHandleProps}>
                                <DragIcon sx={blockStyles.dragHandle} />
                              </Box>
                              <Box sx={blockStyles.content}>
                                <Typography variant="subtitle2">
                                  {block.type.charAt(0).toUpperCase() +
                                    block.type.slice(1)}
                                </Typography>
                                <Typography variant="body2">
                                  {block.content}
                                </Typography>
                              </Box>
                              <IconButton
                                onClick={() => handleDeleteBlock(block.id)}
                                sx={blockStyles.deleteButton}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={commonStyles.card}>
            <CardHeader
              title="Block Types"
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  {
                    type: 'Message',
                    description: 'Send a text message to the user',
                    icon: <MessageIcon />,
                  },
                  {
                    type: 'Menu',
                    description: 'Present options for the user to choose from',
                    icon: <SendIcon />,
                  },
                  {
                    type: 'Condition',
                    description: 'Branch the conversation based on user input',
                    icon: <CheckCircleIcon />,
                  },
                  {
                    type: 'Action',
                    description: 'Perform an action (e.g., send email, update database)',
                    icon: <EditIcon />,
                  },
                ].map((item) => (
                  <Box
                    key={item.type}
                    sx={{
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: 'primary.light',
                        borderRadius: 1,
                        color: 'primary.main',
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">{item.type}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Block Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Block</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Block Type</InputLabel>
              <Select
                value={newBlock.type}
                onChange={(e) =>
                  setNewBlock({ ...newBlock, type: e.target.value })
                }
                sx={commonStyles.input}
              >
                <MenuItem value="message">Message</MenuItem>
                <MenuItem value="menu">Menu</MenuItem>
                <MenuItem value="condition">Condition</MenuItem>
                <MenuItem value="action">Action</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Content"
              value={newBlock.content}
              onChange={(e) =>
                setNewBlock({ ...newBlock, content: e.target.value })
              }
              sx={commonStyles.input}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsAddDialogOpen(false)}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddBlock}
            sx={commonStyles.button}
            startIcon={<AddIcon />}
          >
            Add Block
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Chat Preview</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 2,
                minHeight: 200,
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {previewMessage}
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Type a message..."
              sx={commonStyles.input}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SendIcon sx={{ color: 'primary.main' }} />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsPreviewOpen(false)}
            sx={commonStyles.button}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatbotConfig; 