import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, ScrollView, NativeSyntheticEvent, NativeScrollEvent, ImageSourcePropType} from 'react-native';
import { RectButton, TouchableHighlight } from 'react-native-gesture-handler';
import api from '../../services/weatherApi';
import { climateDataTypes } from '../../types/interface';
import styles from './style';

const Main = () => {

    const [climateData, setClimateData] = useState<climateDataTypes>();
    const [screenPage, setScreenPage] = useState<number>(0);
    const [initialLocation, setInitialLocation] = useState<number[]>([0, 0]);
    const [backgroundImg, setBackgroundImg] = useState<ImageSourcePropType>(require('../../assets/defaultImg.png') as ImageSourcePropType);
    const backgroundImgNames: Object = {
        '00': require('../../assets/defaultImg.png'),
        '01': require('../../assets/clearSky.png'),
        '02': require('../../assets/fewClouds.png'),
        '03': require('../../assets/scatteredClouds.png'), 
        '04': require('../../assets/brokenClouds.png'),
        '09': require('../../assets/showerRain.png'),
        '10': require('../../assets/rain.png'),
        '11': require('../../assets/thunderStorm.png'),
        '13': require('../../assets/snow.png'),
        '50': require('../../assets/mist.png'),
    };
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords

            setInitialLocation([latitude, longitude]);
            getClimateData(latitude, longitude);
            }, () => {
                alert({ messege: "O Compartilhamento de Localização é Necessário para o Funcionamento do App"});
            } 
        )
    }, []);

    useEffect(() => {
            Object.entries(backgroundImgNames).find(item => {
                const backgroundImgId = item[0];
                const backgroundImagePath = item[1];

                String(climateData?.icon).replace(/\D+/g, '') == backgroundImgId
                ? setBackgroundImg(backgroundImagePath)
                : '';
            });
    }, [climateData]);

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

        const dataResponse = {
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
            country: response.data.sys.country,
            icon: response.data.weather[0].icon,
        }
        
        setClimateData(dataResponse);
    };

    function handleUpdateClimateData() {
        const [latitude, longitude ] = initialLocation;

        getClimateData(latitude, longitude);
    }
    
    function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
        const scrollXposition = e.nativeEvent.contentOffset.x;

         setScreenPage(scrollXposition);
    }

    if(!climateData) {
        return (
            <ImageBackground
                source={require('../../assets/loading.png')}
                imageStyle={styles.imageBg}
                style={styles.container}
                
            >
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Weather Now</Text>
                </View>
            </ImageBackground>
        )
    }

    return (
            <ImageBackground
                source={backgroundImg}
                style={styles.container}
                imageStyle={styles.imageBg}
            >
                <View style={styles.page}>

                <View style={styles.pagination}>
                    <View style={screenPage > screenPage/2? styles.inactiveColor : styles.activeColor} />
                    <View style={screenPage > screenPage/2? styles.activeColor : styles.inactiveColor} />
                </View>

                    <View style={styles.carrousselContainer}>
                        <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        onScroll={ event => handleScroll(event)}
                        >
                            <RectButton style={styles.mainContainer}>
                                <View style={styles.temperatureContainer} >
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
                                <View style={styles.detailsData}>
                                    <Text style={styles.detailsText}>Máxima - {climateData.maxTemperature}°C</Text>
                                    <Text style={styles.detailsText}>Mínima - {climateData.minTemperature}°C</Text>
                                    <Text style={styles.detailsText}>Sensação Térmica - {climateData.feelsLike}°C</Text>
                                    <Text style={styles.detailsText}>Pressão atmosférica - {climateData.pressure}hPa</Text>
                                    <Text style={styles.detailsText}>Humidade relativa do ar - {climateData.humidity}%</Text>
                                    <Text style={styles.detailsText}>Visibilidade - {climateData.visibility}m</Text>
                                    <Text style={styles.detailsText}>Velocidade do vento - {climateData.windSpeed}km/h</Text>
                                </View>
                            </RectButton>
                        </ScrollView>
                    </View>                    
                    <TouchableHighlight onPress={handleUpdateClimateData} style={styles.rectButton} underlayColor={'rgba(6, 6, 6, 0.5)'}>
                        <Text style={styles.rectButtonText}>Atualizar Clima</Text>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
    )
};

export default Main;