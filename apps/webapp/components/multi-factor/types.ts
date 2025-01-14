export interface MultiFactorCardProps {
  twoFactorEnabled: boolean;
}

export interface CodeFormProps {
  totpUri: string;
  code: string;
  setCode: (value: string) => void;
  loading: boolean;
  onVerify: () => void;
}

export interface MultiFactorPasswordFormProps {
  onEnable: (values: { password: string }) => Promise<void>;
  isLoading: boolean;
}