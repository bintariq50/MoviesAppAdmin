import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Modal, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import COLORS from "../utils/colors";
import { fetchCategories, addCategory, updateCategory, deleteCategory, getCategory } from "../utils/firebaseServices";
import FONTS from "../utils/fonts";

import PencilIcon from "../assets/icons/PencilIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";

import { useIsFocused } from '@react-navigation/native';
import { Timestamp } from "@react-native-firebase/firestore";

export default function Home() {
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [genre, setGenre] = useState("");
    const [refresh, setRefresh] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [isDisabled, setIsDisabled] = useState(false)

    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState();

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    const handlePressDelete = async (id) => {
        try {
            const deleteCat = async () => {
                await deleteCategory(id)
                setRefresh(prev => prev + 1);

            }
            Alert.alert("Confim", "Are you sure you want to delete?", [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => deleteCat(),
                    style: "default"
                }
            ])
        } catch (error) {
            console.log("Error", "while deleting category", error)
        }
    }
    const handlePressEdit = async (id) => {
        setIsEdit(true);
        const categoryData = await getCategory(id)

        setGenre(categoryData.name)
        setEditId(id)

        handleShowModal(true)



    }

    const handleSubmit = async () => {
        try {
            if (!genre.trim()) {
                Alert.alert("Error", "Please enter category");
                return;
            }
            const data = { name: genre.trim() };

            setIsDisabled(true)
            if (isEdit) {
                data.updatedAt = Date.now();
                // console.log(data)
                await updateCategory(editId, data)
                setIsEdit(false)
                setEditId("");
            }
            else {
                data.createdAt = Date.now();
                await addCategory(data);
            }
            setGenre("");
            setRefresh(prev => prev + 1);
            handleHideModal();
        } catch (error) {
            console.log("Error while submission")
        }
        finally {
            setIsDisabled(false)
        }
    };

    useEffect(() => {
        const categoriesFetch = async () => {
            setLoading(true);
            const categories = await fetchCategories();
            setCategories(categories);
            setLoading(false);
        };
        categoriesFetch();
    }, [refresh, isFocused]);

    if (loading) {
        return (
            <View style={styles.activity}>
                <ActivityIndicator color={COLORS.black} size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.categoriesContainer}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Categories</Text>
                    <Pressable style={styles.addButton} onPress={handleShowModal}>
                        <Text style={styles.addText}>Add Category</Text>
                    </Pressable>
                </View>

                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.category}>
                            <Text style={styles.textCategory}>{item.name}</Text>
                            <View style={styles.actions}>
                                <Pressable onPress={() => handlePressEdit(item.id)}>
                                    <PencilIcon color={COLORS.success} />
                                </Pressable>
                                <Pressable onPress={() => handlePressDelete(item.id)}>
                                    <DeleteIcon width={24} height={24} color={COLORS.danger} />
                                </Pressable>
                            </View>
                        </View>
                    )}
                    style={{ flex: 1 }}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={handleHideModal}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalCard}>
                            <Text style={styles.modalHeading}>{isEdit ? "Update" : "Add"} Category</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter category"
                                placeholderTextColor={COLORS.searchBarTextColor}
                                value={genre}
                                onChangeText={setGenre}
                            />

                            <View style={styles.buttonRow}>
                                <Pressable style={styles.cancelBtn} onPress={handleHideModal} disabled={isDisabled}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </Pressable>

                                <Pressable style={styles.submitBtn} onPress={handleSubmit} disabled={isDisabled}>
                                    {isDisabled ? (
                                        <View style={styles.direction}>
                                            <ActivityIndicator size="small" color={COLORS.white} />
                                            <Text style={styles.submitText}>{isEdit ? "Updating..." : "Saving ..."}</Text>
                                        </View>
                                    ) : (
                                        < Text style={styles.submitText}>{isEdit ? "Update" : "Save"}</Text>
                                    )}
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "5%",
        backgroundColor: COLORS.white
    },
    categoriesContainer: {
        flex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10
    },
    heading: {
        fontSize: 16,
        fontFamily: FONTS.bold
    },
    addButton: {
        backgroundColor: COLORS.brandPrimary,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 20
    },
    addText: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: FONTS.regular
    },
    category: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5
    },
    textCategory: {
        fontFamily: FONTS.regular,
        fontSize: 16
    },
    actions: {
        flexDirection: "row",
        gap: 10
    },
    activity: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white
    },
    modalCard: {
        width: "90%",
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 20
    },
    modalHeading: {
        fontSize: 18,
        fontFamily: FONTS.bold,
        textAlign: "center",
        marginBottom: 15
    },
    direction: {
        flexDirection: "row",
        justifyContent: "space-between"
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