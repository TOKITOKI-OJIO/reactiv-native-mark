// Message.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Message = ({
  type = 'info',
  content,
  duration = 3000,
  onClose,
  showIcon = true,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const typeConfig = {
    info: {
      icon: 'information-circle-outline',
      color: '#1890ff',
      bgColor: '#e6f7ff',
      borderColor: '#91d5ff',
    },
    success: {
      icon: 'checkmark-circle-outline',
      color: '#52c41a',
      bgColor: '#f6ffed',
      borderColor: '#b7eb8f',
    },
    warning: {
      icon: 'warning-outline',
      color: '#faad14',
      bgColor: '#fffbe6',
      borderColor: '#ffe58f',
    },
    error: {
      icon: 'close-circle-outline',
      color: '#ff4d4f',
      bgColor: '#fff2f0',
      borderColor: '#ffccc7',
    },
    loading: {
      icon: 'refresh-outline',
      color: '#1890ff',
      bgColor: '#e6f7ff',
      borderColor: '#91d5ff',
    },
  };

  const config = typeConfig[type];

  useEffect(() => {
    // 进入动画
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // 自动关闭
    if (duration > 0) {
      const timer = setTimeout(() => {
        hideMessage();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, []);

  const hideMessage = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose && onClose();
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: config.bgColor,
          borderColor: config.borderColor,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      {showIcon && (
        <Icon
          name={config.icon}
          size={20}
          color={config.color}
          style={styles.icon}
        />
      )}
      <Text style={[styles.content, { color: '#000' }]}>{content}</Text>
      <TouchableOpacity onPress={hideMessage} style={styles.closeBtn}>
        <Icon name="close" size={16} color="#999" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 9999,
  },
  icon: {
    marginRight: 8,
  },
  content: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  closeBtn: {
    padding: 4,
    marginLeft: 8,
  },
});

export default Message;
