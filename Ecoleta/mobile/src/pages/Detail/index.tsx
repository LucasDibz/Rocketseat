import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, Image, SafeAreaView, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';

interface Params {
    point_id: number;
}

interface Data {
    point: {
        image: string;
        image_url: string;
        name: string;
        email: string;
        whatsapp: string;
        city: string;
        uf: string;
    };
    items: {
        title: string;
    }[]
}

const Detail = () => {
    const [data, setData] = useState<Data>({} as Data);

    const navigation = useNavigation();
    const route = useRoute();

    const routeParams = route.params as Params;

    useEffect(() => {
        api.get(`points/${routeParams.point_id}`)
            .then(response => {
                setData(response.data);
            });
    })

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`)
    }

    function handleComposeMail() {
        MailComposer.composeAsync({
            subject: 'Interesse na coleta de resíduos',
            recipients: [data.point.email],
        })
    }

    if (!data.point) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" color='#34cb79' size={20} />
                </TouchableOpacity>

                <Image style={styles.pointImage} source={{ uri: data.point.image_url }} />

                <Text style={styles.pointName}>{data.point.name}</Text>
                <Text style={styles.pointItems}>
                    {data.items.map(item => { item.title }).join(', ')}
                </Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name='whatsapp' size={20} color='#fff' />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>

                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Icon name='mail' size={20} color='#fff' />
                    <Text style={styles.buttonText}>Email</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    );
}

export default Detail;
