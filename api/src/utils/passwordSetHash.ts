import * as bcrypt from 'bcryptjs';

export const passwordSetHash = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const getNewPassword = (): string => {
  const salt = bcrypt.genSaltSync(10);
  const timestamp = Date.now();

  const newPasswordCandidat = bcrypt.hashSync(
    String(timestamp + getRandomInt(10)),
    salt
  );
  const start = getRandomInt(15);
  return newPasswordCandidat.slice(start, start + 10);
};
