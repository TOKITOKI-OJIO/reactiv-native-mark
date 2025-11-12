// MessageManager.js
import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import Message from './Message';

let messageId = 0;
let messageQueue = [];
let updateCallback;

const MessageManager = () => {
  const [messages, setMessages] = useState([]);

  // 注册更新回调
  useState(() => {
    updateCallback = setMessages;
  });

  const removeMessage = useCallback(id => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
    messageQueue = messageQueue.filter(msg => msg.id !== id);
  }, []);

  return (
    <View
      style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9999 }}
    >
      {messages.map((message, index) => (
        <Message
          key={message.id}
          type={message.type}
          content={message.content}
          duration={message.duration}
          onClose={() => removeMessage(message.id)}
          style={{
            marginTop: index > 0 ? 8 : 0,
          }}
        />
      ))}
    </View>
  );
};

const showMessage = (type, content, duration = 3000) => {
  const id = ++messageId;
  const message = {
    id,
    type,
    content,
    duration,
  };

  messageQueue.push(message);

  if (updateCallback) {
    updateCallback([...messageQueue]);
  }

  return id;
};

const messageApi = {
  info: (content, duration) => showMessage('info', content, duration),
  success: (content, duration) => showMessage('success', content, duration),
  warning: (content, duration) => showMessage('warning', content, duration),
  error: (content, duration) => showMessage('error', content, duration),
  loading: (content, duration = 0) => showMessage('loading', content, duration),

  // 手动关闭
  destroy: () => {
    messageQueue = [];
    if (updateCallback) {
      updateCallback([]);
    }
  },
};

export { MessageManager, messageApi as Message };
export default MessageManager;
