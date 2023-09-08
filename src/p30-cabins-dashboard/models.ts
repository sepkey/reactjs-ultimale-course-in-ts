export interface INewCabin {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
}

export interface ICabin extends INewCabin {
  id: number;
  created_at: string;
  image: string;
}
