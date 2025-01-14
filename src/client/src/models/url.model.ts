export interface URL {
  id: string;
  originalUrl: string;
  shortUrl: string;
  expiresAt?: string | null;
  alias?: string | null;
  createdAt: string;
}
