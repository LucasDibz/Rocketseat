import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import successImg from '../../assets/success.png';
import { Copyright } from '../Copyright';

interface Props {
  onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>Agradecemos o feedback!</Text>

      <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback}>
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
