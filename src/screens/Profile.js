import { View, Text, StyleSheet } from "react-native"
import COLORS from "../utils/colors"
export default function Profile() {
    return (<View style={styles.container}><Text>This is profile screen</Text></View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "5%",
        backgroundColor: COLORS.white
    }
})