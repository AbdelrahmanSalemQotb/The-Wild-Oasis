import {
  USER_FULL_NAME_MIN_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
} from "../utils/constants";
import supabase, { supabaseUrl } from "./supabase";

type Credentials = {
  email: string;
  password: string;
};

type SignupProps = Credentials & { fullName: string };

export async function signup({ email, password, fullName }: SignupProps) {
  if (!email || !password || !fullName)
    throw new Error("Email, password, and full name must be exist");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName: fullName,
        avatar: "",
      },
    },
  });

  // for security reasons don't pass the error message to user
  if (error) {
    let userFriendlyMessage: string = "";

    switch (error.message) {
      case "Invalid email address":
        userFriendlyMessage = "Please enter a valid email address.";
        break;

      default:
        userFriendlyMessage =
          "An unexpected error occurred. Please try again later.";
    }

    throw new Error(userFriendlyMessage);
  }

  return data;
}

export async function login({ email, password }: Credentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    let userFriendlyMessage = "";
    switch (error.message) {
      case "Invalid login credentials":
      case "User not found":
        userFriendlyMessage = "The email or password you entered is incorrect.";

        break;
      case "Email not confirmed":
        userFriendlyMessage =
          "Please confirm your email address before logging in.";
        break;
      default:
        userFriendlyMessage =
          "An unexpected error occurred. Please try again later.";
    }

    throw new Error(userFriendlyMessage);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

type UpdateUserProps = {
  password?: string;
  fullName?: string;
  avatar?: File;
};

type UpdateUserData = {
  password?: string;
  data?: {
    fullName?: string;
    avatar?: string;
  };
};

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: UpdateUserProps) {
  let updateData: UpdateUserData | undefined;

  // 1.  Validate & Update password OR fullName
  if (password) {
    if (password.length < USER_PASSWORD_MIN_LENGTH)
      throw new Error(
        `Password should be at least ${USER_PASSWORD_MIN_LENGTH} characters.`
      );
    // Update password if valid
    updateData = { password };
  }

  if (fullName) {
    if (fullName.length < USER_FULL_NAME_MIN_LENGTH)
      throw new Error(
        `Full name should be at least ${USER_FULL_NAME_MIN_LENGTH} characters.`
      );
    // Update full name if valid
    updateData = { data: { fullName } };
  }
  // validate input is passed
  if (!updateData)
    throw new Error("You must provide either a password or full name.");

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;
  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 15)}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError)
    throw new Error(`Avatar upload error: ${storageError.message}`);

  // 3. Update avatar in the user
  const { data: updatedUser, error: secondError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (secondError) throw new Error(secondError.message);

  return updatedUser;
}
