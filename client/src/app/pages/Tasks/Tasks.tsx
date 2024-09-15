import { RootState, useDispatch, useSelector } from "app/store";
import TasksTable from "./TaskTable";
import { useEffect } from "react";
import { getTasks } from "app/store/actions";
import { Title } from "../AddTask/components/Title";

const Transactions: React.FC = () => {
  const isLoading = useSelector(
    (state: RootState) => state.taskStore.isLoading
  );
  const limit = useSelector((state: RootState) => state.taskStore.tableOptions.limit);
  const offset = useSelector((state: RootState) => state.taskStore.tableOptions.offset) || 0;
  const sort = useSelector((state: RootState) => state.taskStore.tableOptions.sort);
  const sortOrder = useSelector((state: RootState) => state.taskStore.tableOptions.sortOrder);
  const reduxDispatch = useDispatch();
  useEffect(() => {
    reduxDispatch(getTasks({
        offset,
        limit,
        sortOrder,
        sort,
    }));
  }, [limit, offset]);

  return (
    <>
      <Title>Tasks List.</Title>

      <TasksTable/>
    </>
  );
};

export default Transactions;
