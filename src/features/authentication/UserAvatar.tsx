import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  @media (max-width: 400px) {
    & > span {
      display: none;
    }
  }
`;

const Avatar = styled.img`
  display: block;
  height: 3.6rem;
  width: 3.6rem;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user, isLoading } = useUser();

  return (
    <StyledUserAvatar>
      {!isLoading && (
        <>
          <Avatar
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-user.jpg";
            }}
            src={user?.user_metadata.avatar || "/default-user.jpg"}
            alt={`Avatar of ${user?.user_metadata.fullName}`}
          />
          <span>{user?.user_metadata.fullName}</span>
        </>
      )}
    </StyledUserAvatar>
  );
}

export default UserAvatar;
