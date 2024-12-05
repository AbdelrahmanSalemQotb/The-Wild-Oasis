import { Tables, TablesInsert } from "./SupabaseTypes";

export type CabinType = Tables<"cabins">;

export type CabinUpdateType = Omit<Tables<"cabins">, "id" | "created_at">;

export type CabinInsertType = Omit<TablesInsert<"cabins">, "id" | "created_at">;

export type CabinInsertTypeWithImageFile = Omit<CabinInsertType, "image"> & {
  image: string | File;
};
