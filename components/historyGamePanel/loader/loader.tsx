"use client"

export default function loader() {
 
  return (
    <div className="w-full max-w-[1000px] max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide p-8 bg-white rounded-[40px] shadow-container mobile:p-4">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">История игр</p>
      </div>
      <div>
        <table className="w-full mobile:min-w-[360px] overflow-x-auto scrollbar-hide">
          <thead>
            <tr>
              <th className="text-start pb-2 w-[25%] mobile:pr-3">Игроки</th>
              <th className="text-start pb-2 w-[10%] mobile:hidden"></th>
              <th className="text-start pb-2 w-[30%] mobile:hidden"></th>
              <th className="text-start pb-2 w-[20%] mobile:pr-3">Дата</th>
              <th className="text-start pb-2 w-[15%]">Время игры</th>
            </tr>
          </thead>
        </table>
        <div className="text-center mt-10">Загрузка...</div>
      </div>
    </div>
  );
}