import { TActive } from './type';

export interface TCategory {
  id: string;
  name: string;
  image?: string;
  description?: string;
  isActive: TActive;
  createdAt: string;
  updatedAt: string;
}
