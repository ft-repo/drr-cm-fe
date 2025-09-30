import { AuthState } from "@/store/features/authSlice"

export const checkAuth = (token?: string | null, role?: 'ADMIN' | 'USER') => {
  let valid = false
  if (token && role) {
    valid = true
  }
  // RETURN VALID
  return valid
}

export function redirectToLogin(path = '/login') {
  const destinationPath = path
  return {
    redirect: {
      destination: destinationPath,
      permanent: false,
    },
  }
}

export function sessionToProps(session: AuthState, message?: string, status?: number) {
  return {
    props: {
      user: session || null,
      error: {
        message: message || null,
        status: status || null,
      },
    },
  }
}
