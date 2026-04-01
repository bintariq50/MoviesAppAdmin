
import { getFirestore, query, collection, getDocs, getDoc, addDoc, where, updateDoc, doc, deleteDoc, writeBatch } from '@react-native-firebase/firestore';

const db = getFirestore();


const fetchAllMovies = async () => {
    try {
        const snapshot = await getDocs(collection(db, "movies").orderBy('createdAt', 'desc'))
        const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        return result;
    }

    catch (error) {
        console.log("Error in fetching from firebase", error)
    }
}

const fetchMoviesByCategory = async (id) => {
    try {
        const snapshot = await getDocs(collection(db, "movies").where("genre", "==", id))
        const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data }))
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
        const result = await addDoc(collection(db, "categories"), { ...data });
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
        console.log("Category updated");
    } catch (error) {
        console.log("Error updating category:", error);
    }
};

const deleteCategory = async (id) => {
    try {
        const categoryRef = doc(db, "categories", id);
        const moviesRef = await getDocs(collection(db, "movies").where('genre', "==", id))
        const batch = writeBatch(db);

        if (!moviesRef.empty) {
            moviesRef.forEach((item) => {
                batch.delete(item.ref);
                console.log("Hi")
            })
            await batch.commit();
        }


        await deleteDoc(categoryRef);
    } catch (error) {
        throw error
    }
};

const fetchCategories = async () => {
    try {
        const snapshot = await getDocs(collection(db, "categories").orderBy('createdAt', 'desc'))
        const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        return result;
    } catch (error) {
        throw error
    }
}

export { fetchAllMovies, fetchMoviesByCategory, deleteMovie, addMovie, getMovie, updateMovie, fetchCategories, addCategory, updateCategory, deleteCategory, getCategory };