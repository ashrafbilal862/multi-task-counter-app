import React from "react";
import classes from "./CounterAction.module.scss";
import { CounterButton } from "components/Button/index";
import { COUNTER_ACTION, COUNTER_ACTION_TYPE } from "utils/enums";

type ActionFunction = (event: React.MouseEvent<HTMLButtonElement>) => void;

interface ICounterActionProps {
  value: number;
  counterAction: (
    actionType: COUNTER_ACTION_TYPE,
    action: COUNTER_ACTION,
    counterIndex: number
  ) => ActionFunction;
  counterIndex: number;
}

const CounterAction: React.FC<ICounterActionProps> = ({
  value,
  counterAction,
  counterIndex,
}) => {
  return (
    <div className={classes["counter-action"]}>
      <CounterButton
        icon="&#8211;"
        outlined={true}
        action={counterAction(
          COUNTER_ACTION_TYPE.MINUS,
          COUNTER_ACTION.SINGLE,
          counterIndex
        )}
      />
      <span>{value}</span>
      <CounterButton
        outlined={true}
        action={counterAction(
          COUNTER_ACTION_TYPE.ADD,
          COUNTER_ACTION.SINGLE,
          counterIndex
        )}
      />
    </div>
  );
};

export default CounterAction;
