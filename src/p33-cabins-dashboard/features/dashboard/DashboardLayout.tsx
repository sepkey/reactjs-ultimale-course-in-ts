import styled from "styled-components";
import useRecentBookings from "../bookings/useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecenStays from "../bookings/useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { confirmedStays, isLoading: isLoadingStays, stays } = useRecenStays();

  if (isLoadingBookings || isLoadingStays) return <Spinner />;
  console.log(bookings);

  return (
    <StyledDashboardLayout>
      <div>statistics</div>
      <div>list activity</div>
      <div>state duration</div>
      <div>chart of sales</div>
    </StyledDashboardLayout>
  );
}
