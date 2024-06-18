export default function HistoryGamePanel() {
  return (
    <div className="w-full max-w-[1000px] max-h-[855px] overflow-y-scroll scrollbar-hide p-8 bg-white rounded-[40px] shadow-container">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">История игр</p>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start pb-2 w-[60%]">Игроки</th>
              <th className="text-start pb-2 w-[20%]">Дата</th>
              {/*TODO: не точно что будет время игры*/}
              <th className="text-start pb-2 w-[20%]">Время игры</th>
            </tr>
          </thead>
          <tbody>{/*TODO: заполнить данными из базы данных*/}</tbody>
        </table>
      </div>
    </div>
  );
}
