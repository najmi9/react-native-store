import { StyleSheet, Text, View } from "react-native";
import storage from '../utils/storage.js';

export function Header() {
    const user = storage.get('jwt-auth') ? 'Imad' : '';
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Najmi Store</Text>
            { user && <Text style={styles.headerText}>Welcome {user}</Text> }
        </View>
    );
}

export function Footer() {
    return (
        <View style={styles.footer}>
        <Text style={styles.footerText}>NajmiDev@2023</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: 'coral',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        height: 80,
        paddingTop: 38,
        backgroundColor: 'coral',
    },
    footerText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
