import { AuthState } from "@/store/features/authSlice";

export declare type PageProps = {
  user: AuthState;
  error?: {
    message: string | null;
    status: number | null;
  }
}

export declare type Redirect = {
  redirect: {
    destination: string;
    permanent: boolean;
  };
}
