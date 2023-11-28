export interface RegisterDTO {
  email: string;
  username: string;
  role: string;
  password: string;
}

interface AccountId {
  id: number;
}

export interface ApiResponseDTO {
  status: string;
  ok: boolean;
  result: AccountId | null;
  message: string;
}
