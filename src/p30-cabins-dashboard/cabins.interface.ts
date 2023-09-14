interface Cabin {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
}

export interface INewCabin extends Cabin {
  image: FileList | string;
}

export interface IFetchedCabin extends Cabin {
  id: number;
  created_at: string;
  image: string;
}
