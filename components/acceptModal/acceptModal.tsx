"use client";

import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Cup from "/public/cup.svg";
import CustomButton from "@/components/ui/customButton/customButton";
import SecondaryButton from "@/components/ui/secondaryButton/secondaryButton";
import { useRouter } from "next/navigation";

interface AcceptModalProps {
  invite: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onAccept?: () => void;
  onReject?: () => void;
}

export const AcceptModal = ({ isOpen, setIsOpen, invite, onAccept, onReject }: AcceptModalProps) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  const router = useRouter();

  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
    >
      <div
        className="fixed inset-0 bg-black/10"
        aria-hidden="true"
      >
        <div className="fixed inset-0 flex w-full items-center justify-center no-touch:pr-4">
          <Dialog.Panel className={`bg-white rounded-2xl max-w-[400px] w-full py-[40px] px-6`}>
            <div className="flex flex-col items-center ">
              <Image
                className="mb-5"
                width={132}
                src={Cup}
                alt=""
              />
              <Dialog.Title className="text-2xl font-bold mb-5 text-center">
                Приглашение сыграть от {invite?.from}
              </Dialog.Title>
              <div className="flex flex-col gap-3 w-full">
                <CustomButton
                  size="medium"
                  active={true}
                  type="button"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Принять
                </CustomButton>
                <SecondaryButton
                  size="medium"
                  active={true}
                  type="button"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Отклонить
                </SecondaryButton>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
