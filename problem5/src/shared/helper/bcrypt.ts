import bcrypt from "bcrypt";

export const hashPassword = (rawPassword: string) => {
    return bcrypt.hashSync(rawPassword, 10);
};

export const comparePassword = (hashedPassword: string, rawPassword: string) => {
    return bcrypt.compareSync(rawPassword, hashedPassword)
}
