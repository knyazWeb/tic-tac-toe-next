"use client";

export default function loader() {
  return (
    <div className="w-full max-w-[1000px] max-h-[855px] overflow-y-auto scrollbar-hide p-8 bg-white rounded-[40px] shadow-container">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">Рейтинг игроков</p>
      </div>
      <div>
        <table className="w-full min-w-[590px]">
          <thead>
            <tr>
              <th className="text-start pb-2 w-[40%] mobile:pr-2 text-nowrap">ФИО</th>
              <th className="text-start pb-2 w-[15%] mobile:pr-2 text-nowrap">Всего игр</th>
              <th className="text-start pb-2 w-[15%] mobile:pr-2 text-nowrap">Победы</th>
              <th className="text-start pb-2 w-[15%] mobile:pr-2 text-nowrap">Проигрыши</th>
              <th className="text-start pb-2 w-[15%] mobile:pr-2 text-nowrap">Процент побед</th>
            </tr>
          </thead>
        </table>
        <div className="text-center mt-10">Загрузка...</div>
      </div>
    </div>
  );
}
