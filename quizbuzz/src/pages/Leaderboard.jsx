import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyBOhYYKHwwJZbQyYrG1g4ttRvGFwtQaitY",
  authDomain: "quizbuzz-thepywizard.firebaseapp.com",
  projectId: "quizbuzz-thepywizard",
  storageBucket: "quizbuzz-thepywizard.appspot.com",
  messagingSenderId: "852936180798",
  appId: "1:852936180798:web:0d31af825ad23f39cdfd6f",
  measurementId: "G-5H147JE0WE"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Use getFirestore function to get the Firestore instance

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardRef = collection(db, 'leaderboard-stats');
        const snapshot = await getDocs(leaderboardRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className='font-custom flex justify-center mt-6 text-2xl'>Leaderboard</h2>
      <div className='flex justify-center'>
        <table className='border-collapse border border-gray-500'>
          <thead>
            <tr>
              <th className='text-2xl font-custom border border-gray-500 p-2'>Name</th>
              <th className='text-2xl font-custom border border-gray-500 p-2'>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((item) => (
              <tr key={item.id}>
                <td className='border border-gray-500 p-2'>{item.Name}</td>
                <td className='border border-gray-500 p-2'>{item.Score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
