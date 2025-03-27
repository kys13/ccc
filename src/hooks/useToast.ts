import { create, StateCreator } from 'zustand';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastState {
  message: string;
  type: ToastType;
  isVisible: boolean;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

const createToastStore: StateCreator<ToastState> = (set) => ({
  message: '',
  type: 'info',
  isVisible: false,
  showToast: (message: string, type: ToastType = 'info') => {
    set({ message, type, isVisible: true });
    setTimeout(() => {
      set({ isVisible: false });
    }, 3000);
  },
  hideToast: () => set({ isVisible: false }),
});

export const useToast = create<ToastState>(createToastStore); 