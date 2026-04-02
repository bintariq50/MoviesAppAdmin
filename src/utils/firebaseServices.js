
import { getFirestore, query, collection, getDocs, getDoc, addDoc, where, updateDoc, doc, deleteDoc, writeBatch } from '@react-native-firebase/firestore';

const db = getFirestore();

const fetchAllMovies = async () => {
    try {
        const movies = await getDocs(collection(db, "movies").orderBy('createdAt', 'desc'))
        const result = movies.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        return result;
    }

    catch (error) {
        console.log("Error in fetching from firebase", error)
    }
}

const fetchMoviesByCategory = async (id) => {
    try {
        const movies = await getDocs(collection(db, "movies").where("genre", "==", id))
        const result = movies.docs.map(doc => ({ id: doc.id, ...doc.data }))
        return result;
    }
    catch (error) {
        console.log("Error in fetching from firebase", error)
    }
}

const getMovie = async (id) => {
    try {
        const movie = doc(db, "movies", id);
        const result = await getDoc(movie)
        return result.data();
    } catch (error) {
        throw error
    }

}

const addMovie = async (data) => {
    try {
        await addDoc(collection(db, 'movies'), {
            ...data
        })
        return true
    } catch (error) {
        throw error
    }
}

const updateMovie = async (id, data) => {
    try {
        const categoryRef = doc(db, "movies", id);
        await updateDoc(categoryRef, { ...data });
    } catch (error) {
        throw error
    }
};
const deleteMovie = async (id) => {
    try {
        const movie = doc(db, "movies", id);
        await deleteDoc(movie);
    } catch (error) {
        console.log("Error deleting category:", error);
    }
};

const addCategory = async (data) => {
    try {
        await addDoc(collection(db, "categories"), { ...data });
        return true;
    }
    catch (error) {
        throw error
    }
}

const getCategory = async (id) => {
    try {
        const category = doc(db, "categories", id);
        const result = await getDoc(category)
        return result.data();
    } catch (error) {
        throw error
    }

}
const updateCategory = async (id, data) => {
    try {
        const category = doc(db, "categories", id);
        await updateDoc(category, { ...data });
    } catch (error) {
        console.log("Error updating category:", error);
    }
};

const deleteCategory = async (id) => {
    try {
        const category = doc(db, "categories", id);
        const movies = await getDocs(collection(db, "movies").where('genre', "==", id))
        const batch = writeBatch(db);

        if (!movies.empty) {
            movies.forEach((item) => {
                batch.update(item.ref, { genre: "" });
            })
            await batch.commit();
        }


        await deleteDoc(category);
    } catch (error) {
        throw error
    }
};

const fetchCategories = async () => {
    try {
        const categories = await getDocs(collection(db, "categories").orderBy('createdAt', 'desc'))
        const result = categories.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        return result;
    } catch (error) {
        throw error
    }
}


const fetchUsers = async () => {
    try {

    } catch (error) {
        console.log(error)
    }
}
export { fetchAllMovies, fetchMoviesByCategory, deleteMovie, addMovie, getMovie, updateMovie, fetchCategories, addCategory, updateCategory, deleteCategory, getCategory };