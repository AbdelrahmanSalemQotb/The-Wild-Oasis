import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: loginApi,

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
      if (data.weakPassword)
        toast.error("Your password is weak please update your password", {
          icon: "⚠️",
        });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLoading };
}
