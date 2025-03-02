import React, { useState, useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { TextInput, Button, Surface, Text, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! Ben Yummai AI asistanı. Size yemek tarifleri, pişirme teknikleri veya beslenme konularında yardımcı olabilirim. Ne sormak istersiniz?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleSend = async () => {
    if (message.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      // Simulate AI response (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(message),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      
      // Scroll to bottom again after response
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.',
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Temporary function to generate mock responses
  const getAIResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('merhaba') || lowerCaseMessage.includes('selam')) {
      return 'Merhaba! Size nasıl yardımcı olabilirim?';
    } else if (lowerCaseMessage.includes('tarif') || lowerCaseMessage.includes('yemek')) {
      return 'Hangi yemek tarifi ile ilgileniyorsunuz? Size sağlıklı ve lezzetli tarifler önerebilirim.';
    } else if (lowerCaseMessage.includes('kalori') || lowerCaseMessage.includes('diyet')) {
      return 'Sağlıklı beslenme ve kalori takibi konusunda size yardımcı olabilirim. Belirli bir yemek hakkında bilgi almak ister misiniz?';
    } else {
      return 'Bu konuda size daha fazla bilgi vermek isterim. Lütfen sorunuzu biraz daha açar mısınız?';
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.aiMessage]}>
      {!item.isUser && (
        <Avatar.Icon 
          size={40} 
          icon="chef-hat" 
          style={styles.avatar} 
          color="white"
        />
      )}
      <Surface style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.aiBubble]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Surface>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={styles.inputContainer}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Bir mesaj yazın..."
          style={styles.input}
          right={
            <TextInput.Icon
              icon="send"
              onPress={handleSend}
              disabled={isLoading || message.trim() === ''}
            />
          }
          onSubmitEditing={handleSend}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  aiMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    backgroundColor: '#f4511e',
    marginRight: 8,
  },
  messageBubble: {
    padding: 12,
    maxWidth: '80%',
    borderRadius: 16,
    elevation: 1,
  },
  userBubble: {
    backgroundColor: '#f4511e',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    backgroundColor: 'white',
  },
});