import {
  CabinInsertTypeWithImageFile,
  CabinType,
  CabinUpdateType,
} from "../features/Types/CabinTypes";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be deleted `);
  }

  return data;
}

export async function createEditCabin(
  newCabin: CabinUpdateType | CabinInsertTypeWithImageFile,
  id?: number
): Promise<CabinType | null> {
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  const imageName =
    typeof newCabin?.image === "string"
      ? "" // If image is a URL, we don't need to generate a name
      : newCabin.image
      ? `${Math.random()}-${(newCabin.image as File).name}`.replaceAll("/", "")
      : ""; // If image is a File, generate a unique name

  const imagePath: string = hasImagePath
    ? (newCabin.image as string)
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const query = supabase.from("cabins");

  let finalQuery;
  // A) CREATE (if no id is provided)
  if (!id) {
    finalQuery = query.insert([{ ...newCabin, image: imagePath }]); // insert operation
  }
  // B) EDIT (if id is provided)
  if (id) {
    finalQuery = query.update({ ...newCabin, image: imagePath }).eq("id", id); // update operation
  }

  // Perform the query to select a single row
  const { data, error } = await finalQuery!.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be added `);
  }

  // 2. Upload image
  if (hasImagePath) return data;
  if (!newCabin.image) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
