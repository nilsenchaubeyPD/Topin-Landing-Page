'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { StartForm } from '@/components/start/StartForm';

type Ctx = { open: () => void };
const StartCtx = createContext<Ctx>({ open: () => {} });
export const useStartModal = () => useContext(StartCtx);

/** "Try for Free" modal variant of /start. Every Try for Free button opens it. */
export function StartModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  return (
    <StartCtx.Provider value={{ open }}>
      {children}
      <Dialog.Root open={isOpen} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm" />
          <Dialog.Content className="dialog-content fixed left-1/2 top-1/2 z-50 max-h-[92dvh] w-[calc(100%-32px)] max-w-[520px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain rounded-card bg-white p-6 shadow-float md:p-10">
            <Dialog.Title className="font-display text-[32px] font-bold leading-[36px] tracking-[-0.02em] text-navy">
              Try for Free
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-[15px] leading-[23px] text-navy-2">
              1,000 free credits. No credit card. Whole team can join, no seat limits.
            </Dialog.Description>
            <div className="mt-6">
              <StartForm variant="modal" />
            </div>
            <Dialog.Close
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-navy hover:bg-stone"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </StartCtx.Provider>
  );
}
