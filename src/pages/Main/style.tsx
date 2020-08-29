
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    
    imageBg: {
        flex: 1,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 50,
    },
    
    loadingText: {
        fontSize: 45,
        fontFamily: 'ShadowsIntoLightTwo_400Regular', 
        color: '#FFF',
        letterSpacing: 5,
        textAlign: 'center',
        textShadowOffset: {
            width: 2,
            height: 2
        },
        textShadowColor: 'black',
        textShadowRadius: 5,
    },

    page: { 
        flex: 1, 
        padding: 22, 
        paddingHorizontal: 24, 
        width,
    },

    pagination: {
        width: width - 48, 
        marginTop: 15, 
        flexDirection: 'row', 
        justifyContent: 'center'
    },

    activeColor: {
        width: '48%', 
        height: 3, 
        borderRadius: 20,
        marginHorizontal: 5, 
        backgroundColor: '#555',
    },

    inactiveColor: {
        width: '48%', 
        height: 3, 
        borderRadius: 20,
        marginHorizontal: 5, 
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
        width: width - 48,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 15,
    },

    temperatureContainer: {
        flex: 2,
        justifyContent: 'center',
    },

    temperature: {
        fontSize: 75,
        textAlign: 'center',
        color: '#FFF',
        opacity: 0.8,
        fontFamily: 'JosefinSans_300Light',
    },

    locale: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFF',
        opacity: 0.8,
    },

    descriptionContainer: {
        flex: 1,
    },

    descriptionText: {
        textAlign: 'center',
        fontSize: 36,
        fontFamily: 'JosefinSans_300Light',
        color: '#FFF',
    },

    rectButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        opacity: 0.8,
        height: 60,
        borderRadius: 15,
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
        color: '#FFF',
        textAlign: 'center',
    },

    detailsData: {
        flex: 1, 
        justifyContent: 'space-evenly',
        paddingHorizontal: 15,
    },

    detailsText: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: 'JosefinSans_400Regular',
        borderBottomColor: '#FFF',
        borderBottomWidth: 2,
        textAlign: 'right',
    },
});

export default styles;