import { RootState } from "app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "app/store";
import styled from "styled-components/macro";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

export function Nav() {
  let navigate = useNavigate();

  return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <MenuItem key={'add-task'} onClick={()=>navigate('/add-task')}>
              <Typography sx={{ textAlign: 'center' }}>Add Task</Typography>
          </MenuItem>
          <MenuItem key={'task-list'} onClick={()=>navigate('/tasks')}>
              <Typography sx={{ textAlign: 'center' }}>Tasks List</Typography>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
    
  );
}

const Item = styled.a`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
