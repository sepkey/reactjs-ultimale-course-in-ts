import { INewCabin } from "../models";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return data;
}

export async function createEditCabin(newCabin: INewCabin, id?: number) {
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${(newCabin.image as FileList)?.[0]
    .name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? (newCabin.image as string)
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const query = !id
    ? supabase.from("cabins").insert([{ ...newCabin, image: imagePath }])
    : supabase
        .from("cabins")
        .update({ ...newCabin, image: imagePath })
        .eq("id", id)
        .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image[0]);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin could not be uploaded and the cabin was not created.",
    );
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }

  return data;
}
