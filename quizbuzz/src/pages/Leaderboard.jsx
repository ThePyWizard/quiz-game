import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './style.css';

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
        data.sort((a, b) => b.Score - a.Score);
        //console.log(data);
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className='font-custom flex justify-center mt-6 text-2xl mb-8'>Leaderboard</h2>
      <div className='container mx-auto'>
        <table className='w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5'>
          <thead className='text-white'>
            <tr className='bg-green-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0'>
              <th className='text-2xl font-custom border border-gray-500 p-2'>Name</th>
              <th className='text-2xl font-custom border border-gray-500 p-2'>Score</th>
              <th className='text-2xl font-custom border border-gray-500 p-2'>Theme</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((item) => (
              <tr className='font-custom' key={item.id}>
                <td className='border border-gray-500 p-2'>{item.Name}</td>
                <td className='border border-gray-500 p-2'>{item.Score}</td>
                <td className='border border-gray-500 p-2'>{item.Theme}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
