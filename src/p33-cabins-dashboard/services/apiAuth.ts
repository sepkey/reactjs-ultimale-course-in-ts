import supabase from "./supabase";

export type LoginProps = { email: string; password: string };

export async function login({ email, password }: LoginProps) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}
