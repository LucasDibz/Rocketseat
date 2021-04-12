import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { View, ImageBackground, Text } from 'react-native';

import giveClassesBgIcon from '../../assets/images/give-classes-background.png';

import styles from './styles';

const GiveClasses = () => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode={'contain'}
        style={styles.content}
        source={giveClassesBgIcon}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, cadastre-se na nossa plataforma Web
        </Text>
      </ImageBackground>

      <RectButton style={styles.okButton} onPress={goBack}>
        <Text style={styles.okButtonText}>Ok!</Text>
      </RectButton>
    </View>
  );
};

export default GiveClasses;
