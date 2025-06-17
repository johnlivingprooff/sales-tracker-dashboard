export function mapSupabaseError(error) {
  switch (error?.message) {
    case "Email not confirmed":
        return "Please verify your account before logging in. Check your email for a confirmation link.";
    case "Invalid login credentials":
        return "Incorrect email or password.";
    case "Email rate limit exceeded":
        return "Too many attempts. Please wait a few minutes and try again.";
    case "User not found":
        return "No account found with that email.";
    default:
        return error?.message || "An unknown error occurred.";
  }
}
