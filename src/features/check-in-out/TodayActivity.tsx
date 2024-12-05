import styled from "styled-components";

import Heading from "../../ui/common/components/Heading";
import Row from "../../ui/common/components/Row";
import Spinner from "../../ui/common/loaders/Spinner";
import TodayItem from "./TodayItem";
import { useTodayActivity } from "./useTodayActivity";

const StyledToday = styled.div`
  /* Box */
  grid-column: 1 / span 2;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding-top: 2.4rem;
  @media (max-width: 500px) {
    padding: 1.8rem 0.6rem;
  }
`;

const TodayList = styled.ul`
  overflow: auto;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;
function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  if (isLoading) return <Spinner />;

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {!activities?.length ? (
        <NoActivity />
      ) : (
        <TodayList>
          {activities.map((activity) => (
            <TodayItem key={activity.id} activity={activity} />
          ))}
        </TodayList>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
