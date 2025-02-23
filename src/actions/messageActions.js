// actions/messageActions.js

export const addMessage = (text, parentId = null, level = 1) => {
    return {
      type: 'ADD_MESSAGE',
      payload: { text, parentId, level },
    };
  };
  
  // افزودن تابع deleteMessage
  export const deleteMessage = (id) => {
    return {
      type: 'DELETE_MESSAGE',
      payload: { id },
    };
  };
  