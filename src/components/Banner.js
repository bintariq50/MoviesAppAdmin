import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image, useWindowDimensions, Pressable } from 'react-native'
import COLORS from '../utils/colors';
import FONTS from "../utils/fonts"
import PencilIcon from "../assets/icons/PencilIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";
import { getCategory } from '../utils/firebaseServices';
import { useNavigation } from '@react-navigation/native';
export default function Banner({ id, picture_url,video_url, name, genre, handleEdit, handleDelete }) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const handleMoviePlayer = () => {
    navigation.navigate("SingleMovieScreen", {
      movie: { id, video_url, picture_url, name, genre }
    })
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.card}>
        <Pressable onPress={handleMoviePlayer}>
          <Image source={{ uri: picture_url }} style={[styles.image, { width: width / 2 }, { height: height / 7 }]} resizeMode='cover' />
        </Pressable>
        <View style={[styles.cardHeader, { width: width / 3 }]}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
          <Text style={genre ? styles.genre : styles.danger}>
            {genre || "No category"}
          </Text>
        </View>
      </View>
      <View style={styles.icons}>
        <Pressable onPress={() => handleEdit(id)}><PencilIcon color={COLORS.success} /></Pressable>
        <Pressable onPress={() => handleDelete(id)}><DeleteIcon width={24} height={24} color={COLORS.danger} /></Pressable>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: "row",
  },
  image: {
    borderRadius: 10
  },
  cardHeader: {
    paddingLeft: 10,
    justifyContent: "center",

  },
  card: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
  genre: {
    color: COLORS.genreColor,
    fontFamily: FONTS.regular,
    fontSize: 12
  },
  danger: {
    color: COLORS.danger,
    fontFamily: FONTS.bold,
    fontSize: 12
  },

  icons: {
    flexDirection: "column",
    justifyContent: "space-evenly"
  }

});




