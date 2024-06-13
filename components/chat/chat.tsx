import SendMessageForm from "@/components/forms/sendMessageForm/sendMessageForm";
import MessageCard from "@/components/ui/messageCard/messageCard";

export default function Chat() {
  return (
    <div className="max-w-[420px] w-full self-stretch flex flex-col justify-end pb-[88px] gap-3">
      <SendMessageForm />
    </div>
  );
}
