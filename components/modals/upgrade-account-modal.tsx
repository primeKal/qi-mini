"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UpgradeAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpgradeAccountModal({ isOpen, onClose }: UpgradeAccountModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Background Overlay */}
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

        {/* Centered Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-6">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              {/* Title */}
              <Dialog.Title className="text-lg font-bold text-gray-900">
                🔥 Upgrade Your Account
              </Dialog.Title>

              {/* Description */}
              <Dialog.Description className="text-gray-600 mt-2">
                This feature is only available for premium users. Upgrade now to unlock full access and enhance your experience.
              </Dialog.Description>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-between gap-3">
                <Button variant="outline" onClick={onClose} className="w-full">
                  Not Now
                </Button>
                <Link href="/pricing" className="w-full">
                  <Button variant="default" className="w-full">
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
