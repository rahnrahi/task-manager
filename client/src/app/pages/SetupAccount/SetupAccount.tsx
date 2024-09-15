import * as React from "react";
import styled from "styled-components/macro";
import { Title } from "./components/Title";
import SimpleReactValidator from "simple-react-validator";
import {
  CardButton,
  CardForm,
  CardInput,
  CardRow
} from "./components/Card";
import { request } from "utils/request";
import { RootState, useDispatch, useSelector } from "app/store";
import { setIsLoading } from "app/store/taskStore";
import { useNavigate } from "react-router-dom";

export default function SetupAccount() {
  const reduxDispatch = useDispatch();
  let navigate = useNavigate();

  const isLoading = useSelector((state: RootState) => state.taskStore.isLoading);

  const [transact, setTransact] = React.useState({
    username: "",
  });

  const validator = React.useRef(new SimpleReactValidator());

  const setAccountData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTransact((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async () => {
    if (validator.current.allValid()) {
      const payload = {
        username: transact.username,
      };
      reduxDispatch(setIsLoading(true));
      await request("setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response: any) => {
          reduxDispatch(setIsLoading(false));
          if (response.id) {
            localStorage.setItem("userId", response.id);
            navigate("/tasks");
          }
        })
        .catch((err) => {
          reduxDispatch(setIsLoading(false));
          console.log(err.message);
        });
    } else {
      validator.current.showMessages();
    }
  };

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    if(userId!=null){
      navigate("/tasks");
    }else{
      validator.current.showMessages();
    }
  }, []);

  return (
    <Wrapper>
      <Title>Please setup your account.</Title>

      <CardForm>
        <CardRow>
          <CardInput
            type="text"
            placeholder="Enter username"
            value={transact.username}
            name="username"
            onChange={(e) => setAccountData(e)}
            className="text-input"
            maxLength={300}
          />
          {validator.current.message("username", transact.username, "required")}
        </CardRow>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <CardButton
            onClick={() => submitForm()}
            type="button"
            className="btn btn-primary"
            disabled={isLoading}
          >
            <span className="btn-label">Set Up</span>
          </CardButton>
        </div>
      </CardForm>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  margin-top: 4rem;
`;
