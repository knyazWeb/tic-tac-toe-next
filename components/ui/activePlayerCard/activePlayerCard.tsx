import PlayerStatusCard from "@/components/ui/playerStatusCard/playerStatusCard";
import CustomButton from "@/components/ui/customButton/customButton";

interface ActivePlayerCardProps {
  name: string;
  status: string;
}

export default function ActivePlayerCard({ name, status }: ActivePlayerCardProps) {
  return (
    <div className="w-fill max-w-[715px] h-[70px] flex justify-between items-center">
      <div>{name}</div>
      <div className="flex justify-between items-center gap-[80px]">
        <div>
          <PlayerStatusCard
            status={status}
            size="medium"
          />
        </div>
        <div>
          <CustomButton
            size="medium"
            type={"button"}
            active={true}
          >
            Позвать играть
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
