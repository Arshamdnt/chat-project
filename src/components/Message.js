
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage, deleteMessage } from '../actions/messageActions';
import { Card, CardContent, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

const Message = ({ message }) => {
  const dispatch = useDispatch();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete confirmation dialog
  const messageRef = useRef(null);
  const replyInputRef = useRef(null);

  const handleAddReply = () => {
    if (replyText.trim() !== '' && message.level < 3) {
      dispatch(addMessage(replyText, message.id, message.level + 1));
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  const handleScrollToMessage = (id) => {
    const element = document.getElementById(`message-${id}`);
    const container = document.querySelector('.chat-messages');
    if (element && container) {
      const headerOffset = 20;
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const offset = elementRect.top - containerRect.top - headerOffset;
      container.scrollTo({
        top: container.scrollTop + offset,
        behavior: 'smooth'
      });
    }
  };

  const handleReplyClick = () => {
    setShowReplyForm(true);
    setTimeout(() => {
      if (replyInputRef.current) {
        replyInputRef.current.focus();
      }
    }, 0);
  };

  const handleDeleteMessage = () => {
    dispatch(deleteMessage(message.id));
    setOpenDeleteDialog(false); // Close dialog after deletion
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true); // Open confirmation dialog
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false); // Close confirmation dialog
  };


  const formattedTime = format(new Date(message.timestamp), 'HH:mm');

  return (
    <div id={`message-${message.id}`} ref={messageRef} style={{ marginBottom: '20px' }}>
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" flexDirection="column" justifyContent="space-between">
            <span>{message.text}</span>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={1}>
              <Typography variant="caption" color="textSecondary" style={{ marginTop: '5px' }}>
                {formattedTime}
              </Typography>
              <Box display="flex" alignItems="center">
                {message.level < 3 && (
                  <Button 
                    size="small" 
                    onClick={handleReplyClick}
                    variant="outlined"
                    style={{ marginRight: '5px' }}
                    startIcon={<ReplyIcon fontSize="small" />}
                  >
                    پاسخ
                  </Button>
                )}
                <Button 
                  size="small" 
                  onClick={() => {
                    if (message.parentId) {
                      handleScrollToMessage(message.parentId);
                    } else {
                      handleScrollToMessage(message.id);
                    }
                  }}
                  variant="outlined"
                  style={{ marginLeft: '5px', borderColor: '#1976d2', color: '#1976d2' }}
                >
                  <VisibilityIcon fontSize="small" style={{ color: '#1976d2' }} />
                  دیدن پیام
                </Button>
                <Button 
                  size="small" 
                  onClick={handleOpenDeleteDialog}
                  variant="outlined"
                  style={{ 
                    marginLeft: '5px', 
                    borderColor: 'red',
                    color: 'red',
                  }} 
                  startIcon={<DeleteIcon fontSize="small" style={{ color: 'red' }} />}
                >
                  حذف
                </Button>
              </Box>
            </Box>
          </Box>
          {showReplyForm && message.level < 3 && (
            <div style={{ marginTop: '10px' }}>
              <TextField 
                fullWidth 
                variant="outlined" 
                size="small" 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="متن پاسخ..."
                inputRef={replyInputRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAddReply();
                  }
                }}
              />
              <Button 
                style={{ marginTop: '5px' }}
                variant="contained" 
                onClick={handleAddReply}
              >
                ارسال پاسخ
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <div style={{ marginLeft: '20px', marginTop: '10px' }}>
        {message.replies && message.replies.map((reply) => (
          <Message key={reply.id} message={reply} />
        ))}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>تأیید حذف</DialogTitle>
        <DialogContent>
          <DialogContentText>
            آیا از حذف این پیام مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            خیر
          </Button>
          <Button onClick={handleDeleteMessage} color="primary">
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Message;
