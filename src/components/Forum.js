import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from '../actions/messageActions';
import Message from './Message';
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './Forum.css';

const Forum = () => {
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const [newMessageText, setNewMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const handleAddMessage = () => {
    if (newMessageText.trim() !== '') {
      dispatch(addMessage(newMessageText, null, 1));
      setNewMessageText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <TextField 
          fullWidth 
          variant="outlined" 
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="پیام خود را وارد کنید..."
          onKeyDown={handleKeyDown}
          multiline
          maxRows={4}
        />
        <Button 
          variant="contained" 
          onClick={handleAddMessage}
          style={{ marginLeft: '10px' }}
          startIcon={<SendIcon />}
        >
          ارسال
        </Button>
      </div>
    </div>
  );
};

export default Forum;
