import React from 'react';
import classes from './CounterAction.module.scss';
import { CounterButton } from 'components/Button/index';

type ActionFunction = (event: React.MouseEvent<HTMLButtonElement>) => void

interface ICounterActionProps {
    value: number;
    counterAction: (actionType: string, action: string, counterIndex: number) => ActionFunction;
    counterIndex: number
}

const CounterAction: React.FC<ICounterActionProps> = ({ value, counterAction, counterIndex }) => {
    return (
        <div className={classes["counter-action"]}>
            <CounterButton icon="&#8211;" outlined={true} action={counterAction("minus", "single", counterIndex)} />
            <span>{ value }</span>
            <CounterButton outlined={true} action={counterAction("add", "single", counterIndex)}/>
        </div>
    )
}

export default CounterAction
