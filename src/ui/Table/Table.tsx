import { createContext, ReactNode, useContext } from "react";
import styled from "styled-components";

interface ChildrenProp {
  children?: ReactNode;
}

interface ColumnsProp {
  columns: string;
}

interface TableContextType extends ColumnsProp {}

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "columns",
})<ColumnsProp>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  justify-items: center;
  align-items: center;
  transition: none;
  max-width: 100%;
  overflow: hidden;

  & > * {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
  }
  @media (max-width: 850px) {
    font-size: 1.4rem;
    column-gap: 1.2rem;
    padding: 1rem 1.2rem;
  }
  @media (max-width: 560px) {
    font-size: 1.2rem;
    column-gap: 0.6rem;
    padding: 1rem 1.2rem;
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  & > * {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 850px) {
    }
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  overflow-wrap: normal;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const context = createContext<TableContextType | undefined>(undefined);

function Table({ columns, children }: ChildrenProp & ColumnsProp) {
  return (
    <context.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </context.Provider>
  );
}

function Header({ children }: ChildrenProp) {
  const contextValue = useContext(context);
  if (!contextValue)
    throw new Error("Header must be used within a Table provider");

  return (
    <StyledHeader role="row" columns={contextValue.columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children }: ChildrenProp) {
  const contextValue = useContext(context);
  if (!contextValue)
    throw new Error("Row must be used within a Table provider");

  return (
    <StyledRow role="row" columns={contextValue.columns}>
      {children}
    </StyledRow>
  );
}

interface BodyProps<T> {
  data: Array<T>;
  render: (item: T) => ReactNode;
}
function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
