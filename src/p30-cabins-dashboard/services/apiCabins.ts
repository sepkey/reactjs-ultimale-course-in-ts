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

export async function createCabin(newCabin: INewCabin) {
  const imageName = `${Math.random()}-${newCabin.image?.[0].name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image[0]);

  if (storageError) {
    await supabase
      .from("cabins")
      .delete()
      .eq("id", data[data.length - 1].id);
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
