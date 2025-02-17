"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SignUpPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpPromptModal({ isOpen, onClose }: SignUpPromptModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-6">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <Dialog.Title className="text-lg font-bold text-gray-900">
              🚀 Join Us in Less Than a Minute!
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 mt-2">
              Create a free account and unlock access to all our tools.
            </Dialog.Description>

            <div className="mt-6 flex justify-between gap-3">
              <Button variant="outline" onClick={onClose} className="w-full">
                Maybe Later
              </Button>
              <Link href="/sign-up" className="w-full">
                <Button variant="default" className="w-full">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
