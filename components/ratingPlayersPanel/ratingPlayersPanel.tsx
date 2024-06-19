'use client'
import { useEffect, useState } from "react";
import Loader from "./loader/loader";
import { Session } from "next-auth";


export default function RatingPlayersPanel({ session }: { session: Session }) {
  
   const [loading, setLoading] = useState(true);
   const [rating, setRating] = useState([]);
   useEffect(() => {
     const fetchUsers = async () => {
       const res = await fetch(`/api/rating`, {
         method: "GET",
       });
       const data = await res.json();
       setRating(data)
       setLoading(false);
     };
     fetchUsers();
   }, []);

   if (loading) {
     return <Loader />;
   }
  return (
    <div className="w-full max-w-[1000px] max-h-[calc(100vh-100px)] overflow-y-scroll scrollbar-hide p-8 bg-white rounded-[40px] shadow-container">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">Рейтинг игроков</p>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start pb-2 w-[40%]">ФИО</th>
              <th className="text-start pb-2 w-[15%]">Всего игр</th>
              <th className="text-start pb-2 w-[15%]">Победы</th>
              <th className="text-start pb-2 w-[15%]">Проигрыши</th>
              <th className="text-start pb-2 w-[15%]">Процент побед</th>
            </tr>
          </thead>
          <tbody>
            {rating.map((player, index) => (
              <tr
                key={index}
                className="border-b border-t border-t-gray-200 border-b-gray-200"
              >
                <td className="text-start py-2">{player.player}</td>
                <td className="text-start py-2">{player.allGames}</td>
                <td className="text-start py-2 text-[#69B849]">{player.winnersGameCount}</td>
                <td className="text-start py-2 text-error">{player.LossesGameCount}</td>
                <td className="text-start py-2">{player.PercentageOfWins.toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
