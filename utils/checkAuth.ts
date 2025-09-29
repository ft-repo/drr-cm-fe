export const checkAuth = (token?: string | null, role?: 'ADMIN' | 'USER') => {
  let valid = false
  if (token && role) {
    valid = true
  }
  // RETURN VALID
  return valid
}