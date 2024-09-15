import * as React from "react";

import { RootState, useDispatch, useSelector } from "app/store";
import { setLimit } from "app/store/taskStore";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getTasks, removeTask } from "app/store/actions";
import { useNavigate } from "react-router-dom";
import moment from "moment";



const TaskTable: React.FC = () => {

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'description', headerName: 'Description', width: 350 },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
    },
    {
      field: 'deadline',
      headerName: 'Deadline',
      width: 300,
      renderCell: ({formattedValue})=>{
        return moment(formattedValue).format('llll');
      }
    },
    {
      field: 'taskId',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({id})=>{
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      }
    }
  ];
  
  const tasksList = useSelector(
    (state: RootState) => state.taskStore.tasks
  );
  const isLoading = useSelector(
    (state: RootState) => state.taskStore.isLoading
  );
  const reduxDispatcher = useDispatch();
  const totalSize = useSelector((state: RootState) => state.taskStore.totalCount);
  const sizePerPage = useSelector(
    (state: RootState) => state.taskStore.tableOptions.limit
  );

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: sizePerPage,
  });

  const navigate = useNavigate();


  const handlePageClick = (page) => {
    const offset = page === 0 ? 0 : sizePerPage * page;
    reduxDispatcher(
      setLimit({
        offset: offset,
        limit: sizePerPage,
      })
    );
  };

  const handleEditClick = (id: GridRowId) => () => {
    navigate(`/edit-task/${id}`);
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    if(window.confirm("Are you sure?")){
      await reduxDispatcher(
        removeTask(id)
      ).then(r=>{
        reduxDispatcher(getTasks({
          offset: 0,
          limit: sizePerPage,
          sort: 'createdAt',
          sortOrder: 'DESC'
        }));
      });

      
    }
  };

  React.useEffect(() => {
    handlePageClick(paginationModel.page);
  }, [paginationModel.page]);

  return (
    <Paper sx={{ height: '80vh', width: '100%' }}>
    <DataGrid
        rows={tasksList}
        columns={columns}
        rowCount={totalSize}
        pageSizeOptions={[5, 10, 25]}
        pagination
        paginationMode="server"
        sx={{ border: 0 }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={isLoading}
        keepNonExistentRowsSelected
        getRowId={(row) => row.taskId}
      />
    </Paper>
  );
};
export default TaskTable;
