import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Breakfast = {
  hasBreakfast: boolean;
  totalPrice: number;
  extraPrice: number;
};
type MutationFn = {
  bookingId: number;
  breakfast?: Breakfast;
};

export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isChekingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: MutationFn) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries(["bookings", "booking"]);
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isChekingIn };
}
