// src/screens/HomeScreen.tsx
import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const logoTranslateY = useRef(new Animated.Value(0)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoTranslateY, {
        toValue: -140,
        duration: 600,
        useNativeDriver: true,
      }),

      Animated.timing(buttonsOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoTranslateY, buttonsOpacity]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logo.png')}
        style={[
          styles.logo,
          {
            transform: [{translateY: logoTranslateY}],
          },
        ]}
      />

      <Animated.View style={{width: '100%', opacity: buttonsOpacity}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Guest')}>
          <Text style={styles.buttonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 300,
  },
  logo: {
    resizeMode: 'center',
    marginBottom: -60,
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
