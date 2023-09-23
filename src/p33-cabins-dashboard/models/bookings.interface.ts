export interface IFetchedBooking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numGuests: number;
  numNights: number;
  status: Status;
  totalPrice: number;
  cabins: ICabins;
  guests: IGuests;
}

export interface IBookingRow {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: Status;
  guests: IGuests;
  cabins: ICabins;
}

interface IGuests {
  fullName: string;
  email: string;
}
interface ICabins {
  name: string;
}
export type Status = "unconfirmed" | "checked-in" | "checked-out";

export interface IBookingDetail {
  cabinId: number | null;
  cabinPrice: number | null;
  created_at: string;
  endDate: string | null;
  extraPrice: number | null;
  guestId: number | null;
  hasBreakfast: boolean | null;
  id: number;
  isPaid: boolean | null;
  numGuests: number | null;
  numNights: number | null;
  observations: string | null;
  startDate: string | null;
  status: string | null;
  totalPrice: number | null;
  guests: IGuests2;
  cabins: ICabins2;
}

type IGuests2 = {
  countryFlag: string | null;
  created_at: string;
  email: string | null;
  fullName: string | null;
  id: number;
  nationalID: string | null;
  nationality: string | null;
} | null;

type ICabins2 = {
  created_at: string;
  description: string | null;
  discount: number | null;
  id: number;
  image: string | null;
  maxCapacity: number | null;
  name: string | null;
  regularPrice: number | null;
} | null;
