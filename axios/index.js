import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function withAuth() {
//   const token = sessionStorage.getItem('token');
const getToken = async()=> await AsyncStorage.getItem('token');
export default function withAuth() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDA0ZTBmN2RmMTBhOTU5ODZlNjhiOSIsImlhdCI6MTY4MjI1MjA5NywiZXhwIjoxNjg0ODQ0MDk3fQ.28_uApndNnQUqd8nJcgm71i62NOwMcHyUepA3ZrzYXQ';

  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });

  return axiosInstance;
}