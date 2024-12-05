import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/Buttons/ButtonIcon";
import SpinnerMini from "../../ui/common/loaders/SpinnerMini";
import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={() => logout()} title="logout">
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
