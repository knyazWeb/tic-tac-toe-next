import { getAllUsers } from "@/lib/data";
import { User } from "@/lib/interfaces";
import SecondaryButton from "@/components/ui/secondaryButton/secondaryButton";
import PlayerStatusCard from "@/components/ui/playerStatusCard/playerStatusCard";

export default async function AllPlayersPanel() {
  const allUsers = await getAllUsers();
  return (
    <div className="w-full max-w-[800px]  max-h-[855px] overflow-y-scroll scrollbar-hide p-8 bg-white rounded-[40px] shadow-container">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">Список игроков</p>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start pb-2">ФИО</th>
              <th className="text-start pb-2">Статус</th>
              <th className="text-start pb-2">Создан</th>
              <th className="text-start pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user: User) => {
              const createdDate = new Date(user.created_at)
                .toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
                .replace(" г.", "");
              return (
                <tr
                  key={user.id}
                  className="border-b border-t  border-t-gray-200 border-b-gray-200
                 "
                >
                  <td className="w-[40%] py-2">{user.login}</td>
                  {/*TODO: изменить блокирован если пользователь заблокирован*/}
                  <td className="w-[18%] py-2 pr-7">
                    <PlayerStatusCard
                      status="Активен"
                      size="medium"
                    />
                  </td>
                  <td className="py-2">{createdDate}</td>
                  <td className="max-w-[200px] w-full block py-2">
                    {/*TODO: изменить блокирован если пользователь заблокирован*/}
                    <SecondaryButton
                      size="small"
                      type="button"
                      active={true}
                    >
                      Разблокировать
                    </SecondaryButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
