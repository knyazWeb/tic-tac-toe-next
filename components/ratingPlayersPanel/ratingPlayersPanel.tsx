export default function RatingPlayersPanel() {
  return (
    <div className="w-full max-w-[1000px] max-h-[855px] overflow-y-scroll scrollbar-hide p-8 bg-white rounded-[40px] shadow-container">
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
          <tbody>{/*TODO: заполнить данными из базы данных*/}</tbody>
        </table>
      </div>
    </div>
  );
}
