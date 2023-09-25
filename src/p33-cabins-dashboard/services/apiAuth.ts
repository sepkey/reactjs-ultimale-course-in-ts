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

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error) throw new Error(error.message);
  return data?.user;
}
