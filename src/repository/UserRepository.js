
import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase/firebase.js';

export class UserRepository {
  constructor() {
    this.collection = collection(db, 'users');
  }

  async createUser(user) {
    try {
      const userDoc = doc(this.collection, user.id);
      await setDoc(userDoc, user);
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
  }

  async readUser(id) {
    try {
      const userDoc = doc(this.collection, id);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        console.log('No such user!');
      }
    } catch (error) {
      console.error('Error reading user:', error);
    }
  }

  async updateUser(id, updatedFields) {
    try {
      const userDoc = doc(this.collection, id);
      await updateDoc(userDoc, updatedFields);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  async deleteUser(id) {
    try {
      const userDoc = doc(this.collection, id);
      await deleteDoc(userDoc);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}

// Uso da classe UserRepository
// const userRepository = new UserRepository();

// Criar um novo usuário
// userRepository.createUser(newUser);

// // Ler um usuário
// userRepository.readUser('81998644927').then(user => console.log(user));

// // Atualizar um usuário
// userRepository.updateUser('81998644927', { coins: 100, profile: 'admin' });

// // Deletar um usuário
// userRepository.deleteUser('81998644927');
