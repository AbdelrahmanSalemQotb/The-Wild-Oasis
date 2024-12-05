import styled from "styled-components";
import Button from "../Buttons/Button";
import Heading from "../common/components/Heading";
import { ConfirmDeleteProps } from "./ConfirmDeletePropsTypes";

const StyledConfirmDelete = styled.div`
  max-width: 40rem;

  @media (max-width: 700px) {
    width: 70dvw;
  }

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) {
  console.log({ onCloseModal });
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button
          variation="danger"
          disabled={disabled}
          onClick={() => {
            onConfirm?.();
            onCloseModal?.();
          }}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
