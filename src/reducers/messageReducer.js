const initialState = [];
let nextId = 1;

const addMessageHelper = (messages, parentId, newMessage) => {
  if (parentId === null) {
    return [...messages, newMessage];
  }
  return messages.map(message => {
    if (message.id === parentId) {
      return {
        ...message,
        replies: [...message.replies, newMessage],
      };
    } else if (message.replies && message.replies.length > 0) {
      return {
        ...message,
        replies: addMessageHelper(message.replies, parentId, newMessage),
      };
    }
    return message;
  });
};

const messageReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_MESSAGE':
      const newMessage = {
        id: nextId++,
        text: action.payload.text,
        replies: [],
        level: action.payload.level,
        parentId: action.payload.parentId,
        timestamp: new Date().toISOString(), // ذخیره‌سازی زمان ارسال پیام
      };
      return addMessageHelper(state, action.payload.parentId, newMessage);

    case 'DELETE_MESSAGE':
      return state.filter(message => message.id !== action.payload.id);

    default:
      return state;
  }
};

export default messageReducer;


export const deleteMessage = (id) => {
  return {
    type: 'DELETE_MESSAGE',
    payload: { id },
  };
};
