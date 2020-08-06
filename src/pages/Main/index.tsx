import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, processColor } from 'react-native';
import { AppLoading } from 'expo';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/weatherApi';

const Main = () => {

    interface climateDataTypes {
        temperature: number,
        maxTemperature: number,
        minTemperature: number,
        description: number,
        city: string,
        country: string,
    }

    const [climateData, setClimateData] = useState<climateDataTypes>();
    const [initialLocation, setInitialLocation] = useState<number[]>([]);
    
    useEffect(() => {        
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            
            setInitialLocation([latitude, longitude]);
            getClimateData(latitude, longitude);
        }, () => {
            alert("O Compartilhamento de Localização é Necessário para o Funcionamento do App");
        });
    }, []);
    
    const getClimateData = async (lat: number, lon: number) => {
        const response = await api.get('', {
            params: {
                lat,
                lon,
                units: 'metric',
                lang: 'pt_br',
                appid: '38227b808714349b723fb0775b517295',
            }
        });
        
        const climateData = {
            temperature: response.data.main.temp,
            maxTemperature: response.data.main.temp_max,
            minTemperature: response.data.main.temp_min,
            description: response.data.weather[0].description,
            city: response.data.name,
            country : response.data.sys.country,
        };
        
        setClimateData(climateData);
    }

    function updateClimateData() {
        const [latitude, longitude ] = initialLocation;
        getClimateData(latitude, longitude);
    }

    

    if (!climateData) {
        return <AppLoading />
    }
    
    return (

        <>
            <View>
                <Text>{climateData.city}</Text>
                <Text>{climateData.country}</Text>
            </View>
            <View>
                <Text>Agora está fazendo {climateData.temperature}</Text>
                <Text>min {climateData.minTemperature}</Text>
                <Text>max {climateData.maxTemperature}</Text>
                <Text>{climateData.description}</Text>
            </View>
            <RectButton onPress={updateClimateData}>
                <Text>
                    Atualizar
                </Text>
            </RectButton>
        </>
    )
};

export default Main;