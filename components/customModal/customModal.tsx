"use client";

import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Cup from "/public/cup.svg";
import CustomButton from "@/components/ui/customButton/customButton";
import SecondaryButton from "@/components/ui/secondaryButton/secondaryButton";
import { useRouter } from "next/navigation";

interface ModalProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  online?: boolean;
  resetGame: () => void;
}

export default function CustomModal({ isOpen, setIsOpen, title, online, resetGame }: ModalProps) {
  const handleClose = () => {
    setIsOpen(null);
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
        <div className="fixed z-30 inset-0 flex w-[calc(100vw-16px)] items-center justify-center no-touch:pr-4 mx-auto ">
          <Dialog.Panel className={`bg-white rounded-2xl max-w-[400px] w-full py-[40px] px-6`}>
            <div className="flex flex-col items-center ">
              <Image
                className="mb-5"
                priority={true}
                width={132}
                src={Cup}
                alt=""
              />
              <Dialog.Title className="text-2xl font-bold mb-5">{title}</Dialog.Title>
              <div className="flex flex-col gap-3 w-full">
                {!online && (
                  <CustomButton
                    size="medium"
                    active={true}
                    type="button"
                    onClick={() => {
                      resetGame();
                      handleClose();
                    }}
                  >
                    Новая игра
                  </CustomButton>
                )}
                <SecondaryButton
                  active={true}
                  size="medium"
                  type="button"
                  onClick={() => {
                    router.push("/");
                    handleClose();
                  }}
                >
                  Выйти в меню
                </SecondaryButton>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
