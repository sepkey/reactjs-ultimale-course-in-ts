import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import useBooking from "./useBooking";
import { StatusMap } from "../../models/models";
import { IBookingDetail, Status } from "../../models/bookings.interface";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isChekingOut } = useCheckout();

  const { status, id: bookingId } = booking || {};

  const customBooking: IBookingDetail = {
    cabinId: booking?.cabinId || null,
    cabinPrice: booking?.cabinPrice || null,
    created_at: booking?.created_at || "",
    endDate: booking?.endDate || null,
    extraPrice: booking?.extraPrice || null,
    guestId: booking?.guestId || null,
    hasBreakfast: booking?.hasBreakfast || null,
    id: booking?.id || 0,
    isPaid: booking?.isPaid || null,
    numGuests: booking?.numGuests || null,
    numNights: booking?.numNights || null,
    startDate: booking?.startDate || null,
    observations: booking?.observations || null,
    status: booking?.status || null,
    totalPrice: booking?.totalPrice || null,
    guests: booking?.guests || null,
    cabins: booking?.cabins || null,
  };

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          {status !== null && status !== undefined && (
            <Tag type={StatusMap[status as Status]}>
              {status.replace("-", " ")}
            </Tag>
          )}
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={customBooking} />

      <ButtonGroup>
        {status === "checked-in" && (
          <Button
            // icon={HiArrowUpOnSquare}
            onClick={() => checkout(bookingId!)}
            disabled={isChekingOut}
          >
            Check out
          </Button>
        )}
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
