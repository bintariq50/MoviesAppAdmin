import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import COLORS from "../utils/colors"
import { useAuthStore } from '../store/useAuthStore'
import FONTS from "../utils/fonts";
import PageHeader from "../components/PageHeader";
import { useNavigation } from "@react-navigation/native";
export default function Profile() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigation()

    const handleLogout = async () => {
        try {
            await logout();
            console.log("Signed out");
        } catch (error) {
            console.log("Error", "While signging Out", error)
        }
    }
    const handlePress = async () =>{
        navigate.goBack();
    }
    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
                <PageHeader text="Profile" onArrowPress={handlePress} />
            </View>


            <View style={styles.userProfile}>
                <Text style={styles.welcome}>Welcome, {user.email}</Text>
            </View>
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "5%",
        backgroundColor: COLORS.white
    },
    welcome:{
        fontSize:14,
        fontFamily:FONTS.bold
    },
    logoutButton: {
        backgroundColor: COLORS.danger,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10
    }
    ,
    logoutText: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.white
    }
})