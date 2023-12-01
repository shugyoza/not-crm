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
  status: number;
  ok: boolean;
  message: string;
  statusText?: string;
  result?: AccountId;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  name?: string;
}
