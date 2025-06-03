import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  FlatList, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';

const ChatScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Oi, tudo bem?', time: '10:30', sent: false },
    { id: '2', text: 'Tudo sim, e com você?', time: '10:32', sent: true },
    { id: '3', text: 'Estou ótimo! Vamos sair hoje?', time: '10:33', sent: false },
    { id: '4', text: 'Claro! Que horas?', time: '10:35', sent: true },
    { id: '5', text: 'Que tal às 20h?', time: '10:36', sent: false },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);
  
  // Dados do contato (poderiam vir por parâmetro de navegação)
  const contact = route.params?.contact || { 
    name: 'João Silva', 
    image: require('../../assets/user-default.png'),
    online: true 
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <Image source={contact.image} style={styles.headerImage} />
          <View>
            <Text style={styles.headerName}>{contact.name}</Text>
            <Text style={styles.headerStatus}>
              {contact.online ? 'online' : 'offline'}
            </Text>
          </View>
        </View>
      ),
    });
    
    // Rolagem automática para baixo quando novas mensagens são adicionadas
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: (messages.length + 1).toString(),
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simular resposta após 1 segundo
    setTimeout(() => {
      const replyMsg = {
        id: (messages.length + 2).toString(),
        text: 'Resposta automática',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sent: false
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer, 
      item.sent ? styles.sentMessage : styles.receivedMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={90}
      >
        {/* Área de mensagens */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
        
        {/* Input de mensagem */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachmentButton}>
            <Text style={styles.attachmentIcon}>📎</Text>
          </TouchableOpacity>
          
          <TextInput
            style={styles.messageInput}
            placeholder="Digite uma mensagem"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5ddd5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerStatus: {
    fontSize: 12,
    color: '#666',
  },
  messagesList: {
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    borderTopRightRadius: 0,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  messageInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  attachmentButton: {
    padding: 10,
  },
  attachmentIcon: {
    fontSize: 20,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#075e54',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    fontSize: 20,
    color: '#fff',
  },
});

export default ChatScreen;