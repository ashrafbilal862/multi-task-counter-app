import React from "react";
import classes from "./CounterWrapper.module.scss";
import { CounterButton } from "components/Button";
import CounterAction from "../counterAction/CounterAction";
import { COUNTER_ACTION, COUNTER_ACTION_TYPE } from "utils/enums";

const CounterWrapper: React.FC<{}> = () => {
  const [counters, setCounters] = React.useState<number[]>([0]);

  const addNewCounter = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setCounters((prevCounters) => {
      const newCounters = [...prevCounters];
      newCounters.push(0);
      return newCounters;
    });
  };

  const incrementCounter = React.useCallback(
    (action: COUNTER_ACTION, counterIndex: number) => {
      if (action === COUNTER_ACTION.MULTIPLE) {
        return setCounters((prevCounters) => {
          return prevCounters.map((counter) => ++counter);
        });
      }

      return setCounters((prevCounters) => {
        const newCounters = [...prevCounters];
        newCounters[counterIndex] = newCounters[counterIndex] + 1;
        return [...newCounters];
      });
    },
    [setCounters]
  );

  const decrementCounter = React.useCallback(
    (action: COUNTER_ACTION, counterIndex: number) => {
      if (action === COUNTER_ACTION.MULTIPLE) {
        return setCounters((prevCounters) => {
          return prevCounters.map((counter) => --counter);
        });
      }

      return setCounters((prevCounters) => {
        const newCounters = [...prevCounters];
        newCounters[counterIndex] = newCounters[counterIndex] - 1;
        return newCounters;
      });
    },
    [setCounters]
  );

  const updateAllCounters = React.useCallback(
    (
      actionType: COUNTER_ACTION_TYPE,
      action: COUNTER_ACTION,
      counterIndex: number
    ) => {
      return (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (
          actionType === COUNTER_ACTION_TYPE.ADD &&
          action === COUNTER_ACTION.MULTIPLE
        ) {
          return incrementCounter(action, 0);
        }
        if (
          actionType === COUNTER_ACTION_TYPE.MINUS &&
          action === COUNTER_ACTION.MULTIPLE
        ) {
          return decrementCounter(action, 0);
        }

        if (
          actionType === COUNTER_ACTION_TYPE.ADD &&
          action === COUNTER_ACTION.SINGLE
        ) {
          return incrementCounter(action, counterIndex);
        }
        if (
          actionType === COUNTER_ACTION_TYPE.MINUS &&
          action === COUNTER_ACTION.SINGLE
        ) {
          return decrementCounter(action, counterIndex);
        }
      };
    },
    [incrementCounter, decrementCounter]
  );

  return (
    <div className={classes["counter"]}>
      <h2 className={classes["counter__title"]}>Counter Tasks</h2>
      <div className={classes["counter__actions"]}>
        <CounterButton
          icon="&#8211;"
          action={updateAllCounters(
            COUNTER_ACTION_TYPE.MINUS,
            COUNTER_ACTION.MULTIPLE,
            0
          )}
        />
        <CounterButton
          action={updateAllCounters(
            COUNTER_ACTION_TYPE.ADD,
            COUNTER_ACTION.MULTIPLE,
            0
          )}
        />
      </div>
      {counters.map((counter, index) => {
        return (
          <CounterAction
            key={index}
            value={counter}
            counterAction={updateAllCounters}
            counterIndex={index}
          />
        );
      })}
      <div className={classes["counter-add"]} onClick={addNewCounter}>
        <span className={classes["counter-add__icon"]}>+</span>
        <p className={classes["counter-add__text"]}>Add Counter</p>
      </div>
    </div>
  );
};

export default CounterWrapper;
