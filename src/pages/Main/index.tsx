import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { AppLoading } from 'expo';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/weatherApi';
import {climateDataTypes} from '../../types/interface'

const { width } = Dimensions.get('window');
const itemWidth = width.valueOf() - 48;

const Main = () => {
    const [climateData, setClimateData] = useState<climateDataTypes>();
    const [initialLocation, setInitialLocation] = useState<number[]>([]);
    
    useEffect(() => {        
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            
            setInitialLocation([latitude, longitude]);
            getClimateData(latitude, longitude);
        }, () => {
            alert({ messege: "O Compartilhamento de Localização é Necessário para o Funcionamento do App"});
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
            feelsLike: response.data.main.feels_like,
            pressure: response.data.main.pressure,
            humidity: response.data.main.humidity,
            visibility: response.data.visibility,
            windSpeed: response.data.wind.speed,
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
        return (
            <AppLoading>
            </AppLoading>
        )
    };
    
    return (
        <ImageBackground
            source={require('../../assets/sunnyDay.jpg')}
            style={styles.container}
            imageStyle={styles.imageBg}
        >
            <View style={styles.page}>
                <View style={styles.carrousselContainer}>
                    <ScrollView 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    centerContent={true}
                    bounces={true}
                    alwaysBounceHorizontal={true}
                    >
                        <RectButton style={styles.mainContainer}>
                            <View style={styles.temperatureContainer}>
                                <Text style={styles.temperature}>{climateData.temperature}°C</Text>
                                <Text style={styles.locale}>{climateData.city} - {climateData.country}</Text>
                            </View>
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.descriptionText}>{climateData.description}</Text>
                            </View>
                        </RectButton>
                        <RectButton style={styles.mainContainer}>
                            <View style={styles.detailsTitleBox}>
                                <Text style={styles.detailsTitle}>Detalhes do Clima</Text>
                            </View>
                            <View style={ styles.detailsData}>
                                <Text style={styles.detailsText}>Máxima {climateData.maxTemperature}°C</Text>
                                <Text style={styles.detailsText}>Mínima {climateData.minTemperature}°C</Text>
                                <Text style={styles.detailsText}>Sensação Térmica {climateData.feelsLike}°C</Text>
                                <Text style={styles.detailsText}>Pressão atmosférica {climateData.pressure}hPa</Text>
                                <Text style={styles.detailsText}>Humidade relativa do ar {climateData.humidity}%</Text>
                                <Text style={styles.detailsText}>Visibilidade {climateData.visibility}m</Text>
                                <Text style={styles.detailsText}>Velocidade do vento {climateData.windSpeed}km/h</Text>
                            </View>
                        </RectButton>
                    </ScrollView>
                </View>                    
                <RectButton onPress={updateClimateData} style={styles.rectButton}>
                    <Text style={styles.rectButtonText}>Atualizar Clima</Text>
                </RectButton>
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    
    imageBg: {
        flex: 1,
    },

    page: { 
        flex: 1, 
        padding: 22, 
        paddingHorizontal: 24, 
        width,
    },

    carrousselContainer: {
        flex: 1,
        flexDirection: 'row',
        width,
        paddingRight: 24,
    },

    mainContainer: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 24,
        width: itemWidth,
    },

    temperatureContainer: {
        flex: 2,
        justifyContent: 'center',
    },

    temperature: {
        fontSize: 75,
        textAlign: 'center',
        color: '#222',
        opacity: 0.8,
        fontFamily: 'JosefinSans_300Light',
    },

    locale: {
        fontSize: 18,
        textAlign: 'center',
        color: '#222',
        opacity: 0.8,
    },

    descriptionContainer: {
        flex: 1,
    },

    descriptionText: {
        textAlign: 'center',
        fontSize: 36,
        fontFamily: 'JosefinSans_300Light',
        color: '#222',
    },

    rectButton: {
        backgroundColor: 'rgba(20, 20, 20, 0.8)',
        opacity: 0.8,
        height: 60,
        borderRadius: 10,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },

    rectButtonText: {
        flex: 1,
        textAlign: 'center',
        color: '#FFF',
        fontSize: 22,
        letterSpacing: 7,
    },

    detailsTitleBox: {
        padding: 20,
    },
    
    detailsTitle: {
        fontSize: 30,
        fontFamily: 'JosefinSans_300Light',
        color: '#000',
        textAlign: 'center',
    },

    detailsData: {
        flex: 1, 
        justifyContent: 'space-evenly',
    },

    detailsText: {
        fontSize: 18,
        color: '#222',
        fontFamily: 'JosefinSans_400Regular',
        borderBottomColor: '#222',
        borderBottomWidth: 2,
        textAlign: 'right',
    },
});

export default Main;