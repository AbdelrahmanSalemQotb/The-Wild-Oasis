import { Tables, TablesUpdate } from "./SupabaseTypes";

export type SettingsType = Tables<"settings">;

export type SettingsUpdateType = Omit<
  TablesUpdate<"settings">,
  "id" | "created_at"
>;
export type SettingsFields = keyof SettingsType;
