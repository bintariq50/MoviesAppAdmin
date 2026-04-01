
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import Banner from "./Banner"

export default function Banners({movies, handleEdit}) {
    
    return (
        <View style={styles.movies}>
            <FlatList
                data={movies}
                renderItem={({ item }) => <Banner handleEdit={handleEdit} picture_url={item.imageUrl} name={item.name} genre={item.genre} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                nestedScrollEnabled={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    movies: {
        flex: 1,
        flexDirection: "column",
    },
});