import React from 'react';
import classes from './CounterWrapper.module.scss';
import { CounterButton } from 'components/Button';
import CounterAction from '../counterAction/CounterAction';

const CounterWrapper: React.FC<{}> = () => {

    const [counters, setCounters] = React.useState<number[]>([0])

    const addNewCounter = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setCounters((prevCounters) => {
            const newCounters = [...prevCounters];
            newCounters.push(0);
            return newCounters;
        })
    }

    const incrementCounter = React.useCallback((action: string, counterIndex: number) => {
        if( action === "multiple") {
            return setCounters((prevCounters) => {
                return prevCounters.map((counter) => ++counter);
            })
        }

        return setCounters((prevCounters) => {
            const newCounters = [...prevCounters];
            newCounters[counterIndex] = newCounters[counterIndex] + 1
            return [...newCounters];
        })
    }, [setCounters]);

    const decrementCounter = React.useCallback((action: string, counterIndex: number) => {
        if(action === "multiple") {
            return setCounters((prevCounters) => {
                return prevCounters.map((counter) => --counter);
            })
        }

        return setCounters((prevCounters) => {
            const newCounters = [...prevCounters];
            newCounters[counterIndex] = newCounters[counterIndex] - 1
            return newCounters
        })
    }, [setCounters]);


    const updateAllCounters = React.useCallback((actionType: string, action: string, counterIndex: number) => {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            if(actionType === "add" && action === "multiple") {
                return incrementCounter(action, 0);
            }
            if(actionType === "minus" && action === "multiple") {
                return decrementCounter(action, 0);
            }

            if(actionType === "add" && action === "single") {
                return incrementCounter(action, counterIndex);
            }
            if(actionType === "minus" && action === "single") {
                return decrementCounter(action, counterIndex);
            }
        }

    }, [incrementCounter, decrementCounter])

    return (
        <div className={classes["counter"]}>
            <h2 className={classes["counter__title"]}>Counter Tasks</h2>
            <div className={classes["counter__actions"]}>
                <CounterButton icon="&#8211;" action={updateAllCounters("minus", "multiple", 0)} />
                <CounterButton action={updateAllCounters("add", "multiple", 0)} />
            </div>
            {counters.map((counter, index) => {
                return (
                    <CounterAction key={index} value={counter} counterAction={updateAllCounters} counterIndex={index} />
                )
            })}
            <div className={classes["counter-add"]} onClick={addNewCounter}>
                <span className={classes["counter-add__icon"]}>+</span>
                <p className={classes["counter-add__text"]}>Add Counter</p>
            </div>
        </div>
    )
}

export default CounterWrapper
