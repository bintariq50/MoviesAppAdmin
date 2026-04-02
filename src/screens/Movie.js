import { useState, useEffect } from "react";

import { View, Text, StyleSheet, ActivityIndicator, Pressable, Modal, TextInput, Alert, Image, FlatList, TouchableOpacity } from "react-native";
import COLORS from "../utils/colors";
import Banner from "../components/Banner"
import PageHeader from "../components/PageHeader"
import { fetchAllMovies, addMovie, fetchCategories, deleteMovie, getMovie, getCategory, updateMovie } from "../utils/firebaseServices"
import FONTS from "../utils/fonts";
import { useIsFocused } from '@react-navigation/native';

import { launchImageLibrary } from 'react-native-image-picker';

import Video from "react-native-video";


export default function Movie() {
    const isFocused = useIsFocused();

    const [name, setName] = useState();
    const [genre, setGenre] = useState();
    const [image, setImage] = useState();
    const [video, setVideo] = useState();

    const [isDisabled, setIsDisabled] = useState(false);

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState();
    const [showModal, setShowModal] = useState(false);

    const [categories, setCategories] = useState();

    const [isEdit, setIsEdit] = useState();
    const [editId, setEditId] = useState();
    const [refresh, setRefresh] = useState(0);



    useEffect(() => {
        const fetchallmovies = async () => {
            const result = await fetchAllMovies();
            setMovies(result)
            setLoading(false);
        }

        fetchallmovies();
    }, [refresh, isFocused])

    useEffect(() => {
        const getCategories = async () => {
            const result = await fetchCategories();
            setCategories(result)
            setLoading(false)
        }
        getCategories();
    }, [refresh, isFocused])


    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleHideModal = () => {
        setIsEdit("")
        setGenre("")
        setName("")
        setImage("")
        setShowModal(false)
    }

    const handleEditMovie = async (id) => {

        setIsEdit(true)
        const movieData = await getMovie(id);

        setEditId(id)
        setName(movieData.name)
        setGenre(movieData.genre)
        setImage(movieData.imageUrl)
        setVideo(movieData.videoUrl)
        setShowModal(true)

    }

    const handleDeleteMovie = async (id) => {
        try {
            const deleteMo = async () => {
                await deleteMovie(id);
                // console.log(id)
                setRefresh(prev => prev + 1);
            }
            Alert.alert("Confim", "Are you sure you want to delete?", [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => deleteMo(),
                    style: "default"
                }
            ])
        }
        catch (error) {
            console.log("Error while deleting Movie", error)
        }

    }

    const handleSubmit = async () => {
        try {
            if (!name) {
                Alert.alert("Error", "Pleae enter name")
                return;
            }
            if (!genre) {
                Alert.alert("Error", "Pleae choose genre")
                return;
            }
            if (!image) {
                Alert.alert("Error", "Pleae choose image")
                return;
            }
            setIsDisabled(true)

            const imageUrl = await hanleUploadImage(image);
            const videoUrl = await handleUploadVideo(video)
            let data = {
                name: name.trim(),
                genre: genre,
                imageUrl: imageUrl,
                videoUrl: videoUrl

            };
            if (isEdit) {
                data.updatedAt = Date.now()
                await updateMovie(editId, data);
                setIsEdit(false)
                setEditId("");
            }
            else {
                data.createdAt = Date.now()
                await addMovie(data)
            }
            // console.log(data)
            setRefresh(prev => prev + 1)
            handleHideModal()
        } catch (error) {
            console.log("Error while adding data")
        }
        finally {
            setIsDisabled(false)
        }

    }

    const handleImagePicker = async () => {
        try {
            const response = await launchImageLibrary();
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error:", response.error);
            } else {
                const source = response.assets[0].uri;
                setImage(source);
                // console.log("Image selected: ", source);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleVideoPicker = async () => {
        try {
            const response = await launchImageLibrary({
                mediaType: "video"
            });
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error:", response.error);
            } else {
                const source = response.assets[0].uri;
                setVideo(source);
                console.log("Video selected: ", source);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const hanleUploadImage = async (url) => {
        try {
            let data = new FormData();
            data.append("file", {
                uri: url,
                type: "image/jpeg",
                name: 'upload.jpg'
            });
            data.append("upload_preset", "react-native");

            const res = await fetch(`https://api.cloudinary.com/v1_1/dip79ibqr/image/upload`, { method: "POST", body: data }
            );
            const result = await res.json();
            return result.secure_url;
        } catch (error) {
            console.log("Error", "while uploading image to cloudinary", error);
        }
    }


    const handleUploadVideo = async (url) => {
        try {
            let data = new FormData();
            data.append("file", {
                uri: url,
                type: "video/mp4",
                name: 'upload.mp4'
            });
            data.append("upload_preset", "react-native");

            const res = await fetch(`https://api.cloudinary.com/v1_1/dip79ibqr/video/upload`, { method: "POST", body: data }
            );
            const result = await res.json();
            return result.secure_url;
        } catch (error) {
            console.log("Error", "while uploading video to cloudinary", error);
        }
    }

    if (loading) {
        return (
            <View style={styles.activity}>
                <ActivityIndicator color={COLORS.black} size="large" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <PageHeader text="Movies" />
            </View>
            <View style={styles.movieContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.conatinerHeading}>Movies</Text>
                    <Pressable style={styles.addMovieButton} onPress={handleShowModal}>
                        <Text style={styles.addText}>Add Movie</Text>
                    </Pressable>
                </View>
                {/* <Banners movies={movies} handleEdit={handleEditMovie} /> */}

                <View style={styles.movies}>
                    <FlatList
                        data={movies}
                        renderItem={({ item }) => {

                            const category = categories?.find(category => category.id === item.genre)
                            // console.log(category)
                            return (
                                <Banner id={item.id} handleEdit={handleEditMovie}
                                    handleDelete={handleDeleteMovie} video_url={item.videoUrl} picture_url={item.imageUrl}
                                    name={item.name} genre={category?.name} />
                            )
                        }
                        }
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        nestedScrollEnabled={true}
                    />
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={handleHideModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalCard}>

                        <Text style={styles.heading}>{isEdit ? "Update" : "Add"} Movie</Text>

                        <Text style={styles.label}>Movie Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter movie name"
                            placeholderTextColor={COLORS.searchBarTextColor}
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Genres</Text>

                        <FlatList
                            data={categories}
                            renderItem={({ item }) => {
                                const selected = item.id === genre;
                                return (
                                    <TouchableOpacity onPress={() => setGenre(item.id)} style={{
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 10,
                                        backgroundColor: selected ? COLORS.brandPrimary : COLORS.white,
                                        marginRight: 10
                                    }}>
                                        <Text style={{ color: selected ? COLORS.white : COLORS.black }}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={item => item.id}
                            horizontal={true}
                            contentContainerStyle={{ rowGap: 10 }}
                            showsHorizontalScrollIndicator={false}
                        />

                        <Text style={styles.label}>Image</Text>
                        {image && <Image source={{ uri: image }}
                            style={{ width: "auto", height: 150 }}
                            resizeMode="contain" />}
                        <View style={styles.buttonRow}>
                            <Pressable style={styles.submitBtn} onPress={handleImagePicker}>
                                <Text style={styles.submitText}>Select Image</Text>
                            </Pressable>
                        </View>
                        {video && <Video source={{ uri: video }} style={{ width: "auto", height: 150, marginBottom: 10 }}
                            resizeMode="contain" controls={false} />}
                        <View style={styles.buttonRow}>
                            <Pressable style={styles.submitBtn} onPress={handleVideoPicker}>
                                <Text style={styles.submitText}>Select video</Text>
                            </Pressable>


                        </View>

                        <View style={styles.buttonRow}>
                            <Pressable style={styles.cancelBtn} onPress={handleHideModal} disabled={isDisabled}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </Pressable>

                            <Pressable style={styles.submitBtn} onPress={handleSubmit} disabled={isDisabled}>
                                {isDisabled ? (
                                    <View style={styles.direction}>
                                        <ActivityIndicator size="small" color={COLORS.white} />
                                        <Text style={styles.submitText}>{isEdit ? "Updating..." : "Saving..."}</Text>
                                    </View>
                                ) : (
                                    < Text style={styles.submitText}>{isEdit ? "Update" : "Save"}</Text>
                                )}
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "5%",
        backgroundColor: COLORS.white
    },
    activity: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    headerContainer: {

    },
    movieContainer: {
        flex: 1
    },
    movies: {
        flex: 1
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    conatinerHeading: {
        fontSize: 16,
        fontFamily: FONTS.bold
    },
    modalBackground: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        alignItems: "center"
    },
    addMovieButton: {
        backgroundColor: COLORS.brandPrimary,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 20
    },
    addText: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: FONTS.bold
    },
    direction: {
        flexDirection: "row"
    },
    modalCard: {
        width: "90%",
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 20,
    },

    heading: {
        fontSize: 18,
        fontWeight: FONTS.bold,
        marginBottom: 15,
        textAlign: "center"
    },

    label: {
        fontSize: 14,
        fontFamily: FONTS.regular,
        marginTop: 10,
        marginBottom: 5
    },

    input: {
        borderWidth: 1,
        borderColor: COLORS.searchBarBorderColor,
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        fontFamily: FONTS.regular
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    },

    cancelBtn: {
        flex: 1,
        marginRight: 10,
        padding: 12,
        backgroundColor: COLORS.danger,
        borderRadius: 8,
        alignItems: "center"
    },

    submitBtn: {
        flex: 1,
        marginLeft: 10,
        padding: 12,
        backgroundColor: COLORS.brandPrimary,
        borderRadius: 8,
        alignItems: "center"
    },

    cancelText: {
        color: COLORS.white,
        fontFamily: FONTS.regular
    },

    submitText: {
        color: COLORS.white,
        fontFamily: FONTS.bold
    }
});