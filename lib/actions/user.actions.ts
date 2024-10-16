"use server"
import { createAdminClient, createSessionClient } from "@/lib/appwrite"
import { cookies } from "next/headers"
import { ID } from "node-appwrite"
import { parseStringify } from "../utils"

export async function signIn({ email, password }: LoginUser) {
  try {
    const { account } = await createAdminClient()
    const session = await account.createEmailPasswordSession(email, password)
    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    })

    return parseStringify(session)
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function signUp(userData: SignUpParams) {
  const { firstName, lastName, email, password } = userData

  try {
    const { account } = await createAdminClient()

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    )

    const session = await account.createEmailPasswordSession(email, password)

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    })

    return parseStringify(newUserAccount)
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient()
    const user = await account.get()
    return parseStringify(user)
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function logOutAccount() {
  try {
    const { account } = await createSessionClient()

    cookies().delete("appwrite-session")
    await account.deleteSession("current")
  } catch (error) {
    console.log("error logout", error)
    return null
  }
}
