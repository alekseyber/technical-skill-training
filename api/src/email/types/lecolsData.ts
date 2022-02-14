export interface LecolsData extends Record<string, string | number> {
  toEmail: string;
}

export interface LecolsDataResetPassword extends LecolsData {
  username: string;
  password: string;
}
