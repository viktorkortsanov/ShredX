import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

const firebaseService = {

  uploadImage: async (file, folder) => {
    try {
      const timestamp = new Date().getTime();
      const storagePath = `${folder}/${timestamp}_${file.name}`;
      const storageRef = ref(storage, storagePath);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return { url: downloadURL, path: storagePath };
    } catch (error) {
      console.error('Error uploading file to Firebase:', error);
      throw error;
    }
  },

  uploadProgramImage: async (file) => {
    return firebaseService.uploadImage(file, 'program-images');
  },

  uploadRecipeImage: async (file) => {
    return firebaseService.uploadImage(file, 'recipe-images');
  }
};

export default firebaseService;
