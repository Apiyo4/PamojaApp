import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function withAuth() {
//   const token = sessionStorage.getItem('token');
const getToken = async()=> await AsyncStorage.getItem('token');
export default async function withAuth() {
  const token = await getToken()
  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });

  return axiosInstance;
}