import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, StatusBar } from "react-native";
import COLORS from "../utils/colors"
import FONTS from "../utils/fonts";
import Video from "react-native-video";

export default function SingleMovie({ route }) {
    const { movie } = route.params;

    if (!movie) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>Movie not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" />
            {movie.video_url ? (
                <Video source={{ uri: movie.video_url }} style={{ width: "auto", height: 300, marginBottom: 10 }}
                    resizeMode="contain" controls={true} />
            ) : (
                <View style={styles.videoNotFound}>
                    <Text style={styles.error}>No Video Found</Text>
                </View>
            )}
            <View style={styles.content}>
                <Text style={styles.title}>{movie.name}</Text>

                <Text style={styles.genre}>
                    {movie.genre || "No category"}
                </Text>


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },

    image: {
        width: "100%",
        height: 250
    },

    content: {
        padding: 20
    },

    title: {
        fontSize: 24,
        color: COLORS.black,
        marginBottom: 8,
        fontFamily: FONTS.bold

    },
    videoNotFound: {
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },

    genre: {
        fontSize: 14,
        color: COLORS.danger,
        marginBottom: 20
    },



    label: {
        color: "#94a3b8",
        fontSize: 12
    },

    value: {
        color: COLORS.white,
        fontSize: 16,
        marginTop: 5
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    error: {
        fontSize: 20,
        fontFamily: FONTS.bold,
        color: COLORS.danger
    }
});