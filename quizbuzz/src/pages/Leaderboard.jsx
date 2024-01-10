import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

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
        console.log(data);
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
