import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Text, Image, Picker } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const Home = () => {
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    const navigation = useNavigation();

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufInitials = response.data.map(uf => uf.sigla);
                setUfs(ufInitials);
            });
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome);
                setCities(cityNames);
            });

    }, [selectedUf]);

    function handleNavigationToPoints() {
        navigation.navigate('Points');
    }

    return (
        <ImageBackground
            source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{ width: 274, height: 268 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>Seu marketplace de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma efíciente.</Text>
            </View>

            <View style={styles.footer}>
                <Picker
                    selectedValue={selectedUf}
                    style={styles.input}
                    onValueChange={uf => setSelectedUf(uf)}>
                    {ufs.map(uf => (
                        <Picker.Item key={uf} label={uf} value={uf} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={selectedCity}
                    style={styles.input}
                    onValueChange={city => setSelectedCity(city)}>
                    {cities.map(city => (
                        <Picker.Item key={city} label={city} value={city} />
                    ))}
                </Picker>
                <RectButton style={styles.button} onPress={handleNavigationToPoints}>
                    <View style={styles.buttonIcon}>
                        <Icon name='arrow-right' color='#FFF' size={24} />
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
}

export default Home;