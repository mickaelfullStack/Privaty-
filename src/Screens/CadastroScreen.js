import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para gerar um nome de usuário aleatório
  const generateRandomUsername = () => {
    const adjectives = ['Misterioso', 'Anônimo', 'Secreto', 'Invisível', 'Oculto', 'Desconhecido', 'Misterio', 'Fantasma'];
    const nouns = ['Visitante', 'Usuário', 'Espectador', 'Observador', 'Viajante', 'Hóspede', 'Explorador'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    return `${randomAdj}${randomNoun}${randomNum}`;
  };

  // Função para gerar um email aleatório
  const generateRandomEmail = () => {
    const domains = ['anonmail.com', 'privater.com', 'secretuser.net', 'incognito.me', 'ghost.org'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${generateRandomUsername().toLowerCase()}@${randomDomain}`;
  };

  useEffect(() => {
    if (isAnonymous) {
      // Gerar dados aleatórios quando perfil anônimo for selecionado
      setUsername(generateRandomUsername());
      setEmail(generateRandomEmail());
      setPassword(''); // Limpar senha para o usuário definir
    } else {
      // Limpar campos quando desmarcar anônimo
      setUsername('');
      setEmail('');
    }
  }, [isAnonymous]);

  const handleAnonymousToggle = (value) => {
    setIsAnonymous(value);
  };

  return (
    <ImageBackground 
      source={require('../../assets/background.png')} 
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Cadastro</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={setUsername}
            editable={!isAnonymous}
            selectTextOnFocus={!isAnonymous}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            editable={!isAnonymous}
            selectTextOnFocus={!isAnonymous}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#fff"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <View style={styles.genderContainer}>
            <Text style={styles.genderText}>Gênero:</Text>
            <View style={styles.genderOptions}>
              <TouchableOpacity 
                style={[styles.genderButton, gender === 'male' && styles.genderSelected]}
                onPress={() => setGender('male')}
              >
                <Text style={styles.genderButtonText}>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.genderButton, gender === 'female' && styles.genderSelected]}
                onPress={() => setGender('female')}
              >
                <Text style={styles.genderButtonText}>Feminino</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.genderButton, gender === 'other' && styles.genderSelected]}
                onPress={() => setGender('other')}
              >
                <Text style={styles.genderButtonText}>Outro</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.anonymousContainer}>
            <Text style={styles.anonymousText}>Perfil anônimo:</Text>
            <View style={styles.anonymousOptions}>
              <TouchableOpacity 
                style={[styles.anonymousButton, isAnonymous && styles.anonymousSelected]}
                onPress={() => handleAnonymousToggle(true)}
              >
                <Text style={styles.anonymousButtonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.anonymousButton, !isAnonymous && styles.anonymousSelected]}
                onPress={() => handleAnonymousToggle(false)}
              >
                <Text style={styles.anonymousButtonText}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Faça login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#fff',
    fontSize: 16,
  },
  genderContainer: {
    width: '100%',
    marginBottom: 20,
  },
  genderText: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    marginHorizontal: 5,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  genderButtonText: {
    color: '#fff',
  },
  anonymousContainer: {
    width: '100%',
    marginBottom: 20,
  },
  anonymousText: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  anonymousOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  anonymousButton: {
    flex: 1,
    marginHorizontal: 5,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anonymousSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  anonymousButtonText: {
    color: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  loginText: {
    color: '#fff',
  },
  loginLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});