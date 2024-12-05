import Button from "../../ui/Buttons/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { checkout, isCheckout } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
