export interface CreateUserDto {
  id?: number;
  full_name: string;
  email: string;
  password: string;
}

export type ModifiedUserDto = Omit<CreateUserDto, 'password'>;
