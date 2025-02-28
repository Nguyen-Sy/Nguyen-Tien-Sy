export type SignUpDto = SignInDto & {
    name: string;
};

export type SignInDto = {
    userEmail: string;
    password: string;
};

export type UpdateUserDto = {
    name?: string;
};
