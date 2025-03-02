import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, TextInput as RNTextInput } from 'react-native';
import { Text, Surface, Button, Avatar, Chip, ActivityIndicator, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { deepSeekService } from '../../lib/deepseek';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  relatedRecipe?: {
    id: string;
    name: string;
  };
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  // Add initial welcome message when the component mounts
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Merhaba! Ben Yummai AI asistanınızım. Size nasıl yardımcı olabilirim? Evdeki malzemelerle ne yapabileceğinizi öğrenmek ister misiniz? Ya da belirli bir tarif hakkında bilgi almak ister misiniz?',
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    const currentInputText = inputText.trim();
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Get chat history in the format expected by the DeepSeek service
      const chatHistory = messages.map(msg => ({
        text: msg.text,
        isUser: msg.isUser
      }));

      // Call the DeepSeek service to get AI response
      const response = await deepSeekService.sendChatMessage(currentInputText, chatHistory);
      
      // Create AI response message
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        relatedRecipe: response.relatedRecipe
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback response in case of error
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Üzgünüm, şu anda yanıt oluşturamıyorum. Lütfen daha sonra tekrar deneyin.',
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message: Message) => {
    return (
      <View 
        key={message.id} 
        style={[
          styles.messageContainer, 
          message.isUser ? styles.userMessageContainer : styles.aiMessageContainer
        ]}
      >
        {!message.isUser && (
          <Avatar.Icon 
            size={36} 
            icon="robot" 
            style={[styles.avatar, { backgroundColor: "#f4511e" }]} 
            color="white"
          />
        )}
        <Surface 
          style={[
            styles.messageBubble, 
            message.isUser ? styles.userMessageBubble : styles.aiMessageBubble
          ]} 
          elevation={1}
        >
          <Text style={message.isUser ? styles.userMessageText : styles.aiMessageText}>
            {message.text}
          </Text>
          {message.relatedRecipe && (
            <Chip 
              icon="food" 
              mode="outlined" 
              style={styles.recipeChip}
              onPress={() => router.push({
                pathname: '/recipes/[id]',
                params: { id: message.relatedRecipe?.id }
              })}
            >
              {message.relatedRecipe.name}
            </Chip>
          )}
        </Surface>
        {message.isUser && (
          <Avatar.Icon 
            size={36} 
            icon="account" 
            style={[styles.avatar, { backgroundColor: "#f4511e" }]} 
            color="white"
          />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={80}
    >
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>AI Yemek Asistanı</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Malzemelerinizi girin, size özel tarifler alın
        </Text>
      </View>

      <ScrollView 
        style={styles.messagesContainer}
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map(renderMessage)}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#f4511e" />
            <Text style={styles.loadingText}>Yanıt yazılıyor...</Text>
          </View>
        )}
      </ScrollView>

      <Surface style={styles.inputContainer} elevation={4}>
        <RNTextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Bir mesaj yazın..."
          multiline
          maxLength={500}
          onSubmitEditing={handleSendMessage}
        />
        <IconButton
          icon="send"
          size={24}
          iconColor="white"
          style={styles.sendButton}
          disabled={!inputText.trim() || isLoading}
          onPress={handleSendMessage}
        />
      </Surface>

      <Surface style={styles.suggestionsContainer} elevation={1}>
        <Text variant="bodySmall" style={styles.suggestionsTitle}>Önerilen Sorular:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip 
            style={styles.suggestionChip} 
            onPress={() => {
              setInputText('Evde domates ve peynir var, ne yapabilirim?');
            }}
          >
            Evde domates ve peynir var, ne yapabilirim?
          </Chip>
          <Chip 
            style={styles.suggestionChip} 
            onPress={() => {
              setInputText('Vegan yemek tarifleri önerir misin?');
            }}
          >
            Vegan yemek tarifleri önerir misin?
          </Chip>
          <Chip 
            style={styles.suggestionChip} 
            onPress={() => {
              setInputText('Hızlı ve kolay bir akşam yemeği tarifi verir misin?');
            }}
          >
            Hızlı ve kolay bir akşam yemeği tarifi?
          </Chip>
        </ScrollView>
      </Surface>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontWeight: 'bold',
    color: '#f4511e',
  },
  subtitle: {
    color: '#666',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    marginHorizontal: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '75%',
  },
  userMessageBubble: {
    backgroundColor: '#e3f2fd',
    borderBottomRightRadius: 4,
  },
  aiMessageBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
  },
  userMessageText: {
    color: '#0d47a1',
  },
  aiMessageText: {
    color: '#333',
  },
  recipeChip: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 48,
  },
  loadingText: {
    marginLeft: 8,
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#f4511e',
    margin: 4,
  },
  suggestionsContainer: {
    padding: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  suggestionsTitle: {
    marginBottom: 8,
    color: '#666',
  },
  suggestionChip: {
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
});