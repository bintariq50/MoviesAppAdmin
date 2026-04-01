import { Pressable, useWindowDimensions } from "react-native";
import { StyleSheet, Text, View } from "react-native"

import ArrowIcon from "../assets/icons/ArrowIcon";
import COLORS from "../utils/colors";
import FONTS from "../utils/fonts";

import { useNavigation } from '@react-navigation/native';

export default function PageHeader({ text, onArrowPress }) {
    const { width, height } = useWindowDimensions();
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack();
    };
    return (
        <View style={[styles.pageHeaderContainer, { width: "100%", height: height / 15 }]}>
            <Pressable style={styles.leftItem} onPress={handleBackPress}>
                <ArrowIcon width={24} color={COLORS.black} />
            </Pressable>
            <View style={styles.headerText}>
                <Text style={styles.pageText}>{text}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    pageHeaderContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    leftItem: {
        position: "absolute",
        left: 0,
        paddingVertical: 10,
    },
    headerText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    pageText: {
        fontSize: 20,
        fontFamily: FONTS.bold
    }
});