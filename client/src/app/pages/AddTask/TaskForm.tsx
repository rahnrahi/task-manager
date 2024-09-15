import * as React from "react";
import { Title } from "./components/Title";
import SimpleReactValidator from "simple-react-validator";

import { RootState, useDispatch, useSelector } from "app/store";
import { saveTask, getTask } from "app/store/actions";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Tasks } from "app/store/tasks";
import moment from "moment";

export default function TransactUI() {
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();
  const params= useParams()
  const initFormState: Tasks = {
    taskId: "",
    title: "",
    description: "",
    status: "ToDo",
    priority: "LOW",
    deadline: null
  };

  const [taskData, setTask] = React.useState(initFormState);
  const curTask = useSelector((state: RootState) => state.taskStore?.curTask);


  const validator = React.useRef(new SimpleReactValidator());

  const setTaskData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<String>): void => {
    setTask((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const setDeadLine = deadline => {
    setTask((prevState) => ({
      ...prevState,
      ['deadline']: deadline
    }));
  };

  const submitForm = async () => {
    if (validator.current.allValid()) {
      reduxDispatch(saveTask(taskData)).then(r=>navigate('/tasks'));
    } else {
      validator.current.showMessages();
    }
  };

  useEffect(()=>{
     if(curTask?.taskId){
      const prevTask = {...initFormState};
      for(let [key] of Object.entries(initFormState)){
        if(key==='deadline' && moment(curTask[key]).isValid()){
          prevTask[key] = moment(curTask[key]);
        }else{
          prevTask[key] = curTask[key];
        }
      }
      setTask(prevTask);
     } 
  }, [curTask?.taskId])

  useEffect(() => {
    if(params?.taskId){
      reduxDispatch(getTask(params?.taskId))
    }else{
      setTask(initFormState);
      validator.current.showMessages();
    }
  }, [params?.taskId]);



  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Title>Please enter your task details.</Title>
        <Grid size={12}>
          <TextField
            required
            id="title"
            name="title"
            label="Title"
            defaultValue=""
            size="small"
            fullWidth
            onChange={(e) => setTaskData(e)}
            value={taskData.title}
          />
          {validator.current.message(
            "Title",
            taskData.title,
            "required"
          )}
        </Grid>
        <Grid size={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            defaultValue=""
            size="small"
            fullWidth
            value={taskData.description}
            onChange={(e) => setTaskData(e)}
          />
          {validator.current.message(
            "Description",
            taskData.description,
            "required"
          )}
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <InputLabel id="task-status">Status</InputLabel>
            <Select
              labelId="task-status"
              id="task-status"
              name="status"
              value={taskData.status}
              label="Status"
              size="small"
              onChange={(e) => setTaskData(e)}
            >
              <MenuItem value={'ToDo'}>To Do</MenuItem>
              <MenuItem value={'InProgress'}>In Progress</MenuItem>
              <MenuItem value={'Done'}>Done</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <InputLabel id="task-priority">Priority</InputLabel>
            <Select
              labelId="task-priority"
              id="task-priority"
              name="priority"
              value={taskData.priority}
              label="Priority"
              size="small"
              onChange={(e) => setTaskData(e)}
            >
              <MenuItem value={'LOW'}>LOW</MenuItem>
              <MenuItem value={'MEDIUM'}>MEDIUM</MenuItem>
              <MenuItem value={'HIGH'}>HIGH</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={12}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                label="Deadline"
                value={taskData.deadline}
                onChange={(newValue) => setDeadLine(newValue)}
              />
          </LocalizationProvider>
          {validator.current.message(
            "DeadLine",
            taskData.deadline,
            "required"
          )}
        </Grid>
        <Grid size={12}>
           <Button onClick={()=>submitForm()} type="button" variant="contained">SAVE</Button>
        </Grid>
      </Grid>
    </Box>
  );
}