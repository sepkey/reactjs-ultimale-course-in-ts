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
type Status = "unconfirmed" | "checked-in" | "checked-out";
