import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import { IBookingDetail } from "../../models/bookings.interface";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useChekin from "./useChekin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);

  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const { checkin, isChekingIn } = useChekin();
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};

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

  function handleCheckin() {
    if (!confirmPaid) return;
    checkin(bookingId || 0);
  }

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={customBooking} />
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id={bookingId || ""}
          disabled={confirmPaid || isChekingIn}
        >
          I confirm that {guests?.fullName} has paid the total amount of {""}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isChekingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
