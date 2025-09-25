import { hashSync, compareSync } from "bcrypt";

const saltRounds = 10;

const hash = (text: string): string => {
    const hashedText = hashSync(text, saltRounds);
    return hashedText;
};

const compare = (text: string, hashedText: string) => compareSync(text, hashedText);

export {
    hash,
    compare
};