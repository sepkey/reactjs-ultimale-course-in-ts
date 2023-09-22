import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
import { IBookingRow, IFetchedBooking } from "../../models/bookings.interface";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, isLoading } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resourceName="bookings" />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings as IFetchedBooking[]}
          render={(booking) => {
            const customBooking: IBookingRow = {
              guests: {
                email: booking.guests.email,
                fullName: booking.guests.fullName,
              },
              cabins: { name: booking.cabins.name },
              totalPrice: booking.totalPrice,
              id: booking.id,
              numNights: booking.numNights,
              numGuests: booking.numGuests,
              endDate: booking.endDate,
              startDate: booking.startDate,
              status: booking.status,
              created_at: booking.created_at,
            };
            return <BookingRow key={booking.id} booking={customBooking} />;
          }}
        />
        <Table.Footer>
          <Pagination count={bookings.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
