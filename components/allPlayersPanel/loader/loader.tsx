"use client";

export default function Loader() {
  return (
    <div className="w-full max-w-[1000px] max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide p-8 bg-white rounded-[40px] shadow-container mobile:p-4">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold mobile:text-xl">Список игроков</p>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start pb-2 w-[40%]">ФИО</th>
              <th className="text-start pb-2 w-[20%]">Статус</th>
              <th className="text-start pb-2 w-[20%]">Создан</th>
              <th className="text-start pb-2 w-[20%]"></th>
            </tr>
          </thead>
        </table>
        <div className="text-center mt-10">Загрузка...</div>
      </div>
    </div>
  );
}
