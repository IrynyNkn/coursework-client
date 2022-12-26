export type UserRoles = 'user' | 'manager' | 'admin';

export type UserType = {
  id: 'b29e32fc-0ed0-4bab-8e41-d807cb8098e6';
  badgeColor: string | null;
  email: string;
  roles: UserRoles[];
  userName: string;
};
