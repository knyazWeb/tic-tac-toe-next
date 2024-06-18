interface FadeProps {
  className?: string;
}

export default function Fade({ className }: FadeProps) {
  return <div className={`w-full bg-gradient-to-b ${className}`}></div>;
}
