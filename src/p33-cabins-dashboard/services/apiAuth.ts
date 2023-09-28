import { UserAttributes } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";

export type SignupProps = { email: string; password: string; fullName: string };

export async function signup({ email, fullName, password }: SignupProps) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });

  if (error) throw new Error(error.message);
  return data;
}

export type LoginProps = { email: string; password: string };

export async function login({ email, password }: LoginProps) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export type UpdateUserProps = {
  fullName: string;
  password: string;
  avatar: string | FileList;
};

export async function updateCurrentUser({
  avatar,
  fullName,
  password,
}: Partial<UpdateUserProps>) {
  // 1- Update password or fullname
  let updateUser: UserAttributes = {};
  if (password) updateUser = { password };
  if (fullName) updateUser = { data: { fullName } };
  const { error, data } = await supabase.auth.updateUser(updateUser);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2- Updload the avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar[0]);

  if (storageError) throw new Error(storageError.message);

  // 3-Update avatar in the user

  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) throw new Error(updateError.message);

  return updateUser;
}
