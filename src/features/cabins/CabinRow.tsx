import { HiPencil } from "react-icons/hi";
import { HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ConfirmDelete from "../../ui/ConfirmDelete/ConfirmDelete";
import Menus from "../../ui/Menus/Menus";
import Modal from "../../ui/Modal/Modal";
import Table from "../../ui/Table/Table";
import { formatCurrency } from "../../utils/helpers";
import { CabinType } from "../Types/CabinTypes";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import useDeleteCabin from "./useDeleteCabin";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  max-width: 100%;
`;

const Cabin = styled.div`
  font-size: 1.6rem;

  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  @media (max-width: 500px) {
    font-size: inherit;
  }
`;

const Price = styled.div`
  overflow: hidden;
  overflow-wrap: break-word;
  font-family: "Sono";
  font-weight: 600;
  @media (max-width: 450px) {
    font-size: 0.8rem;
  }
`;

const Discount = styled.div`
  overflow: hidden;
  overflow-wrap: break-word;
  font-family: "Sono";
  font-weight: 500;
  @media (max-width: 450px) {
    font-size: 0.8rem;
  }
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: CabinType }) {
  const {
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    id: cabinId,
  } = cabin;

  const { createCabin } = useCreateCabin();

  const { isDeleting, deleteCabin } = useDeleteCabin();

  function handleDelCabin() {
    if (cabinId) deleteCabin(cabinId);
  }

  function handleDuplicate() {
    createCabin({
      maxCapacity,
      regularPrice,
      discount,
      image,
      description: cabin.description,
      name: `Copy of ${cabin.name}`,
    });
  }

  const is400px = useMediaQuery("(max-width: 400px)");
  //TODO: modal on click again close

  return (
    <Modal>
      <Table.Row>
        <Img src={image as string} alt={`image of cabin-${name}`} />

        <Cabin title={name as string}>{name}</Cabin>
        <div>{is400px ? maxCapacity : `Fits up to ${maxCapacity} guests`}</div>

        <Price title={formatCurrency(regularPrice)}>
          {formatCurrency(regularPrice)}
        </Price>
        {discount ? (
          <Discount title={formatCurrency(discount)}>
            {formatCurrency(discount)}
          </Discount>
        ) : (
          "—"
        )}

        <Menus.Menu>
          <Menus.Toggle id={cabinId as number} />

          <Menus.List id={cabinId as number}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>

            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete cabin</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              onConfirm={handleDelCabin}
              disabled={isDeleting}
              resourceName="Cabin"
            />
          </Modal.Window>
        </Menus.Menu>
      </Table.Row>
    </Modal>
  );
}

export default CabinRow;
