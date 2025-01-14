import dayjs from "dayjs";

export interface CreateUrlDto {
  originalUrl: string;
  alias?: string;
  expiresAt?: dayjs.Dayjs | string;
}
