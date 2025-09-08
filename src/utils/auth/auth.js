"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

export async function login(email, password) {
  const supabase = await createClient()

  // in practice, you should validate your inputs
  const data = {
    email: email,
    password: password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error("Login Error:", error.message);
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function resetPassword(email) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.resetPasswordForEmail(email,
    { redirectTo: `https://regafy.netlify.app/restablecerContrasena` })

  if (error) {
    console.error("Error resetting password:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function signup(email, password) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: email,
    password: password,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error("Signup Error:", error.message);
  }
}


export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Signout Error:", error.message);
  }
}

export async function updatePassword(newPassword) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })
  if (error) {
    console.log(error)
  }
  return (data)
};

export async function deleteUser(userId) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.api.deleteUser(
    userId
  )

  if (error) {
    console.log(error)
  }

  const { error: deleteProfileError } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId)

  if (deleteProfileError) {
    console.log(deleteProfileError)
  }

  return data;
}

