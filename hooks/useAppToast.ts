import { useToast } from "react-native-toast-notifications";

export const useAppToast = () => {
  const toast = useToast();

  return {
    success: (message: string) =>
      toast.show(message, {
        type: "success",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      }),

    error: (message: string) =>
      toast.show(message, {
        type: "danger",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      }),

    warning: (message: string) =>
      toast.show(message, {
        type: "warning",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      }),

    info: (message: string) =>
      toast.show(message, {
        type: "normal",
        placement: "top",
        duration: 3000,
        animationType: "slide-in",
      }),
  };
};
