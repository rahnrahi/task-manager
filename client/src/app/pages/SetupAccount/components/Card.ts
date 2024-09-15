import styled from "styled-components/macro";

export const CardForm = styled.form`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 35rem;
  margin: 1rem 0;

  .btn-primary {
    --button-color: #0f75ae;
    --button-text-color: #fafbfc;
  }
  .btn-secondary {
    --button-color: #88d2fc;
    --button-text-color: #fafbfc;
  }
`;
interface CardRowType {
  direction?: string;
}
export const CardRow = styled.div<CardRowType>`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
  flex-direction: ${(props) => (props?.direction === "row" ? "row" : "column")};
  .srv-validation-message {
    color: red;
    font-size: 1rem;
  }
`;

export const CardRowLast = styled.div`
  display: flex;
  margin: 0.2rem;
  width: 50%;
  flex-direction: column;
`;

export const CardInput = styled.input`
  border: none;
  border-bottom: 0.125rem solid var(--omrs-color-ink-medium-contrast);
  width: 100%;
  height: 3rem;
  font-size: 1.0625rem;
  padding-left: 0.875rem;
  line-height: 147.6%;
  padding-top: 0.825rem;
  padding-bottom: 0.5rem;
  background: var(--omrs-color-bg-high-contrast);
  :focus {
    outline: none;
  }
  :hover {
    background: var(--omrs-color-interaction-minus-two);
    border-color: var(--omrs-color-ink-high-contrast);
  }
`;

export const CardButton = styled.button`
  border: 1px solid #efefef;
  box-sizing: border-box;
  font-family: inherit;
  padding: 0.8rem 1rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--button-color);
  background-color: var(--button-color);
  color: var(--button-text-color);
  font-size: 1rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  :hover {
    position: relative;
    top: -1px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  }
  :focus {
    outline: 0;
    box-shadow: inset -1px -1px 0 rgba(0, 0, 0, 0.2),
      inset -1px 1px 0 rgba(0, 0, 0, 0.2);
  }
  :disabled {
    --button-color: #e5e5e5;
    --button-text-color: #5a5a5a;
    color: rgba(90, 90, 90, 0.8);
    border: 1px solid rgba(218, 218, 218, 0.5);
    pointer-events: none;
  }
`;

export const CardSwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  .round {
    border-radius: 34px;
  }

  .round:before {
    border-radius: 50%;
  }
`;

export const CardSwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  :checked + .slider {
    background-color: #2196f3;
  }
  :focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }
  :checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

export const CardSwitchSlide = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  :before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;
