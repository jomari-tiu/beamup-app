export type TUser = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  registration: string;
  status: boolean;
  labels: Array<any>;
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  mfa: boolean;
  prefs: {};
  targets: Array<{
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    name: string;
    userId: string;
    providerId: any;
    providerType: string;
    identifier: string;
    expired: boolean;
  }>;
  accessedAt: string;
};
