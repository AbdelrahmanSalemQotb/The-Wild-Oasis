import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { SettingsType } from "../Types/SettingsTypes";

export function useSettings() {
  const { data: settings, isLoading } = useQuery<SettingsType | undefined>({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isLoading };
}
