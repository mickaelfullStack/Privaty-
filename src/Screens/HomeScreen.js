import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  Dimensions,
  Alert,
  TextInput,
  Modal,
  ActivityIndicator
} from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  // Estados
  const [stories, setStories] = useState([
    { 
      id: '1', 
      username: 'Seu Story', 
      image: require('../../assets/user-default.png'), 
      hasStory: false, 
      isAdd: true,
      viewed: false
    },
    { 
      id: '2', 
      username: 'amigo1', 
      image: require('../../assets/user1.png'), 
      hasStory: true, 
      viewed: false, 
      online: true,
      newStory: false,
      lastUpdated: new Date(Date.now() - 3600000) // 1 hora atrás
    },
    { 
      id: '3', 
      username: 'amigo2', 
      image: require('../../assets/user2.png'), 
      hasStory: true, 
      viewed: true, 
      online: false,
      newStory: false,
      lastUpdated: new Date(Date.now() - 7200000) // 2 horas atrás
    },
    { 
      id: '4', 
      username: 'amigo3', 
      image: require('../../assets/user1.png'), 
      hasStory: true, 
      viewed: false, 
      online: true,
      newStory: true,
      lastUpdated: new Date() // Agora
    },
    { 
      id: '5', 
      username: 'amigo4', 
      image: require('../../assets/user1.png'), 
      hasStory: false, 
      viewed: false, 
      online: true,
      newStory: false,
      lastUpdated: new Date(Date.now() - 86400000) // 1 dia atrás
    },
  ]);

  const [chats, setChats] = useState([
    { 
      id: '1', 
      name: 'Grupo da Família', 
      lastMessage: 'Bom dia a todos!', 
      time: '10:30', 
      unread: 3, 
      online: false,
      image: require('../../assets/icon.png')
    },
    { 
      id: '2', 
      name: 'João', 
      lastMessage: 'Vamos sair hoje?', 
      time: '09:15', 
      unread: 0, 
      online: true,
      image: require('../../assets/user1.png')
    },
    { 
      id: '3', 
      name: 'Maria', 
      lastMessage: 'Obrigada pela ajuda!', 
      time: 'Ontem', 
      unread: 1, 
      online: true,
      image: require('../../assets/user2.png')
    },
    { 
      id: '4', 
      name: 'Trabalho', 
      lastMessage: 'Reunião amanhã', 
      time: 'Ontem', 
      unread: 0, 
      online: false,
      image: require('../../assets/background.png')
    },
    { 
      id: '5', 
      name: 'Carlos', 
      lastMessage: 'Manda o arquivo quando puder', 
      time: '25/05', 
      unread: 0, 
      online: false,
      image: require('../../assets/user3.png')
    },
  ]);

  const [newUsers, setNewUsers] = useState([
    { 
      id: '6', 
      name: 'Ana', 
      online: true, 
      image: require('../../assets/user2.png'),
      lastActive: '2 min atrás'
    },
    { 
      id: '7', 
      name: 'Pedro', 
      online: false, 
      image: require('../../assets/user2.png'),
      lastActive: '1 hora atrás'
    },
    { 
      id: '8', 
      name: 'Luiza', 
      online: true, 
      image: require('../../assets/user1.png'),
      lastActive: 'agora'
    },
    { 
      id: '9', 
      name: 'Rafael', 
      online: true, 
      image: require('../../assets/user1.png'),
      lastActive: '5 min atrás'
    },
  ]);

  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [hasNewStory, setHasNewStory] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);

  // Simular notificações de mensagens
  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (Math.random() < 0.2 && chats.length > 0) {
        setHasNewNotification(true);
        
        const randomChatIndex = Math.floor(Math.random() * chats.length);
        const updatedChats = [...chats];
        
        updatedChats[randomChatIndex] = {
          ...updatedChats[randomChatIndex],
          unread: updatedChats[randomChatIndex].unread + 1,
          lastMessage: 'Nova mensagem!',
          time: 'Agora'
        };
        
        setChats(updatedChats);
      }
    }, 15000);

    return () => clearInterval(messageInterval);
  }, [chats]);

  // Simular novos stories
  useEffect(() => {
    const storyInterval = setInterval(() => {
      if (Math.random() < 0.15 && stories.length > 1) {
        const randomStoryIndex = Math.floor(Math.random() * (stories.length - 1)) + 1;
        const updatedStories = [...stories];
        
        updatedStories[randomStoryIndex] = {
          ...updatedStories[randomStoryIndex],
          hasStory: true,
          newStory: true,
          viewed: false,
          lastUpdated: new Date()
        };
        
        setStories(updatedStories);
        setHasNewStory(true);
        
        // Notificar apenas se o app estiver em segundo plano
        Alert.alert(
          'Novo Story',
          `${updatedStories[randomStoryIndex].username} postou um novo story!`,
          [{ text: 'OK', onPress: () => {} }]
        );
      }
    }, 30000);

    return () => clearInterval(storyInterval);
  }, [stories]);

  // Marcar story como visualizado
  const markStoryAsViewed = (storyId) => {
    setStories(stories.map(story => 
      story.id === storyId ? { ...story, viewed: true, newStory: false } : story
    ));
    setHasNewStory(stories.some(s => !s.viewed && s.hasStory && s.id !== storyId));
  };

  // Função para adicionar story
  const handleAddStory = () => {
    Alert.alert(
      'Criar Story',
      'Escolha o tipo de story:',
      [
        {
          text: 'Tirar Foto',
          onPress: () => navigation.navigate('Camera', { type: 'photo' })
        },
        {
          text: 'Enviar da Galeria',
          onPress: () => navigation.navigate('Gallery')
        },
        {
          text: 'Criar Texto',
          onPress: () => navigation.navigate('TextStory')
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ],
      { cancelable: true }
    );
  };

  // Visualizar story
  const viewStory = (story) => {
    if (story.isAdd) {
      handleAddStory();
      return;
    }

    if (!story.hasStory) return;

    setCurrentStory(story);
    markStoryAsViewed(story.id);
    setShowStoryModal(true);
  };

  // Renderizar item de story
  const renderStory = ({ item }) => (
    <TouchableOpacity 
      style={styles.storyContainer}
      onPress={() => viewStory(item)}
    >
      <View style={styles.storyWrapper}>
        <View style={[
          styles.storyCircle,
          item.hasStory && !item.viewed && styles.unviewedStory,
          item.newStory && styles.newStoryIndicator
        ]}>
          <Image source={item.image} style={styles.storyImage} />
          {item.isAdd && (
            <View style={styles.addStoryPlus}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
          )}
        </View>
        {item.online && !item.isAdd && <View style={styles.onlineBadge} />}
      </View>
      <Text style={styles.storyUsername} numberOfLines={1}>
        {item.username}
      </Text>
    </TouchableOpacity>
  );

  // Renderizar item de chat
  const renderChat = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatContainer}
      onPress={() => {
        // Marcar como lido
        const updatedChats = chats.map(chat => 
          chat.id === item.id ? { ...chat, unread: 0 } : chat
        );
        setChats(updatedChats);
        navigation.navigate('Chat', { contact: item });
      }}
    >
      <View style={styles.chatImageContainer}>
        <Image source={item.image} style={styles.chatImage} />
        {item.online && <View style={styles.onlineBadge} />}
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
      <View style={styles.chatContent}>
        <Text style={styles.chatName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.chatLastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <View style={styles.chatRightSection}>
        <Text style={[
          styles.chatTime,
          item.unread > 0 && styles.unreadTime
        ]}>
          {item.time}
        </Text>
        {item.unread > 0 && <View style={styles.notificationDot} />}
      </View>
    </TouchableOpacity>
  );

  // Renderizar novo usuário
  const renderNewUser = ({ item }) => (
    <TouchableOpacity 
      style={styles.newUserContainer}
      onPress={() => navigation.navigate('Profile', { user: item })}
    >
      <View style={styles.newUserImageContainer}>
        <Image source={item.image} style={styles.newUserImage} />
        {item.online && <View style={styles.onlineBadge} />}
      </View>
      <Text style={styles.newUserName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.lastActiveText}>{item.lastActive}</Text>
    </TouchableOpacity>
  );

  // Modal de story
  const StoryModal = () => (
    <Modal
      visible={showStoryModal}
      transparent={false}
      animationType="slide"
      onRequestClose={() => setShowStoryModal(false)}
    >
      <View style={styles.storyModalContainer}>
        <View style={styles.storyModalHeader}>
          <View style={styles.storyUserInfo}>
            <Image 
              source={currentStory?.image} 
              style={styles.storyModalUserImage} 
            />
            <Text style={styles.storyModalUsername}>
              {currentStory?.username}
            </Text>
            <Text style={styles.storyTime}>
              {formatTime(currentStory?.lastUpdated)}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowStoryModal(false)}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.storyContent}>
          <Image 
            source={require('../../assets/background.png')} 
            style={styles.storyImageFull} 
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.storyFooter}>
          <TextInput
            style={styles.storyReplyInput}
            placeholder="Envie uma mensagem..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.sendStoryReplyButton}>
            <Text style={styles.sendStoryReplyIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Formatador de tempo
  const formatTime = (date) => {
    if (!date) return '';
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'agora';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min atrás`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} h atrás`;
    return `${Math.floor(diff / 86400000)} dias atrás`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.headerIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.headerIcon}>⋮</Text>
            {(hasNewNotification || hasNewStory) && (
              <View style={styles.notificationDot} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Seção de Stories */}
      <View style={styles.storiesSection}>
        <FlatList
          data={stories}
          renderItem={renderStory}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesList}
        />
      </View>

      {/* Divisor */}
      <View style={styles.divider} />

      {/* Seção de Novos Usuários */}
      <View style={styles.newUsersSection}>
        <Text style={styles.sectionTitle}>Novos no App</Text>
        <FlatList
          data={newUsers}
          renderItem={renderNewUser}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.newUsersList}
        />
      </View>

      {/* Divisor */}
      <View style={styles.divider} />

      {/* Lista de Chats */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#075e54" />
        </View>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChat}
          keyExtractor={item => item.id}
          style={styles.chatsList}
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>Nenhuma conversa encontrada</Text>
            </View>
          }
        />
      )}

      {/* Modal de Story */}
      <StoryModal />
    </SafeAreaView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#075e54',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcons: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-between',
  },
  headerIcon: {
    fontSize: 22,
    color: 'white',
  },
  searchButton: {
    padding: 5,
  },
  menuButton: {
    padding: 5,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#25D366',
    borderWidth: 1,
    borderColor: '#075e54',
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
  },
  storiesSection: {
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  storiesList: {
    paddingLeft: 10,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
  },
  storyWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  storyCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
  },
  unviewedStory: {
    borderColor: '#ff2d55',
  },
  newStoryIndicator: {
    borderColor: '#5ac8fa',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  addStoryPlus: {
    position: 'absolute',
    backgroundColor: '#075e54',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 5,
    right: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  plusIcon: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  storyUsername: {
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
  },
  onlineBadge: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  divider: {
    height: 8,
    backgroundColor: '#f0f0f0',
  },
  newUsersSection: {
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  sectionTitle: {
    paddingLeft: 15,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  newUsersList: {
    paddingLeft: 10,
  },
  newUserContainer: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  newUserImageContainer: {
    position: 'relative',
  },
  newUserImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  newUserName: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  lastActiveText: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
  },
  chatsList: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chatImageContainer: {
    position: 'relative',
  },
  chatImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
    marginRight: 10,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  chatLastMessage: {
    fontSize: 14,
    color: '#666',
  },
  chatRightSection: {
    alignItems: 'flex-end',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  unreadTime: {
    color: '#075e54',
    fontWeight: 'bold',
  },
  unreadBadge: {
    position: 'absolute',
    right: 10,
    top: 0,
    backgroundColor: '#25D366',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyListText: {
    fontSize: 16,
    color: '#888',
  },
  // Estilos do Modal de Story
  storyModalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  storyModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 40,
  },
  storyUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyModalUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  storyModalUsername: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  storyTime: {
    color: '#ccc',
    fontSize: 12,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 24,
  },
  storyContent: {
    flex: 1,
    justifyContent: 'center',
  },
  storyImageFull: {
    width: '100%',
    height: '100%',
  },
  storyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  storyReplyInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'white',
    marginRight: 10,
  },
  sendStoryReplyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#075e54',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendStoryReplyIcon: {
    color: 'white',
    fontSize: 18,
  },
});

export default HomeScreen;