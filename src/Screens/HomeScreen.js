import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const HomeScreen = () => {
  // Dados dos stories
  const [stories, setStories] = useState([
    { id: '1', username: 'Seu Story', image: require('../../assets/user-default.png'), hasStory: false, isAdd: true },
    { id: '2', username: 'amigo1', image: require('../../assets/user-default.png'), hasStory: true, viewed: false },
    { id: '3', username: 'amigo2', image: require('../../assets/user-default.png'), hasStory: true, viewed: false },
    { id: '4', username: 'amigo3', image: require('../../assets/user-default.png'), hasStory: true, viewed: true },
    { id: '5', username: 'amigo4', image: require('../../assets/user-default.png'), hasStory: true, viewed: false },
  ]);

  // Dados das conversas
  const [chats, setChats] = useState([
    { id: '1', name: 'Grupo da Família', lastMessage: 'Bom dia a todos!', time: '10:30', unread: 3 },
    { id: '2', name: 'João', lastMessage: 'Vamos sair hoje?', time: '09:15', unread: 0 },
    { id: '3', name: 'Maria', lastMessage: 'Obrigada pela ajuda!', time: 'Ontem', unread: 1 },
    { id: '4', name: 'Trabalho', lastMessage: 'Reunião amanhã', time: 'Ontem', unread: 0 },
    { id: '5', name: 'Carlos', lastMessage: 'Manda o arquivo quando puder', time: '25/05', unread: 0 },
  ]);

  const renderStory = ({ item }) => (
    <TouchableOpacity 
      style={styles.storyContainer}
      onPress={() => item.isAdd ? console.log('Adicionar story') : console.log('Ver story')}
    >
      <View style={[
        styles.storyCircle,
        item.hasStory && !item.viewed && !item.isAdd && styles.unviewedStory,
        item.isAdd && styles.addStory
      ]}>
        <Image source={item.image} style={styles.storyImage} />
        {item.isAdd && <Text style={styles.plusIcon}>+</Text>}
      </View>
      <Text style={styles.storyUsername}>{item.username}</Text>
    </TouchableOpacity>
  );

  const renderChat = ({ item }) => (
    <TouchableOpacity style={styles.chatContainer}>
      <View style={styles.chatImageContainer}>
        <Image 
          source={require('../../assets/user-default.png')} 
          style={styles.chatImage}
        />
        {item.unread > 0 && <View style={styles.unreadBadge}><Text style={styles.unreadText}>{item.unread}</Text></View>}
      </View>
      <View style={styles.chatContent}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.chatTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
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

      {/* Lista de Chats */}
      <FlatList
        data={chats}
        renderItem={renderChat}
        keyExtractor={item => item.id}
        style={styles.chatsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-between',
  },
  headerIcon: {
    fontSize: 20,
  },
  storiesSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  storiesList: {
    paddingLeft: 10,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 15,
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
  },
  unviewedStory: {
    borderColor: '#ff2d55',
  },
  addStory: {
    borderColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  plusIcon: {
    fontSize: 20,
    color: '#007AFF',
  },
  storyUsername: {
    fontSize: 12,
  },
  chatsList: {
    flex: 1,
  },
  chatContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  chatImageContainer: {
    position: 'relative',
  },
  chatImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  unreadBadge: {
    position: 'absolute',
    right: 10,
    top: 0,
    backgroundColor: '#25D366',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chatContent: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chatLastMessage: {
    fontSize: 14,
    color: '#666',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default HomeScreen;