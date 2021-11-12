import React from 'react';
import classes from 'components/Button/counterButton/CounterButton.module.scss'

interface ICounterButtonProps {
    icon?: string;
    outlined?: boolean;
    action?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const CounterButton: React.FC<ICounterButtonProps> = ({ icon = "+", outlined = false, action}) => {
    return (
        <button onClick={action} className={`${classes["counter-button"]} ${outlined && classes["counter-button--outlined"]}`}>
            {icon}
        </button>
    )
}

export default CounterButton
