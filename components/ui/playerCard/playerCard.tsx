import Image from "next/image";

interface PlayerCardProps {
  image: any;
  name: string;
  winrate?: number;
}

export default function PlayerCard({ image, name, winrate }: PlayerCardProps) {
  return (
    <div className="flex gap-3 items-center">
      <div>
        <Image
          className="mobile:w-[17px]"
          height={26}
          src={image}
          alt=""
        />
      </div>
      <div>
        <div className="text-[20px] mobile:text-sm">{name}</div>
        {winrate && <div className="text-[#898993] text-sm">{winrate}% Побед</div>}
      </div>
    </div>
  );
}
