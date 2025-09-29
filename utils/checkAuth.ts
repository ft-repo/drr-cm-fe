export const checkAuth = (token: string, username: string) => {
  let valid = false
  if (token && username) {
    valid = true
  }
  // RETURN VALID
  return valid
}