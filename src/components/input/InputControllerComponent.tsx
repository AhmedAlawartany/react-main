import React from 'react';
import { useController, Control } from 'react-hook-form';
import Hint from '@/components/hint/HintComponent';
import * as Theme from './Theme';
import Label from '@/components/label/LabelComponent';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label: string;
    hint?: string;
}
const InputControllerComponent: React.FC<InputProps> = ({
    name,
    control,
    label,
    type = 'text',
    placeholder,
    ...rest
}) => {
    const {
        field,
        fieldState: { error: fieldError },
    } = useController({
        name,
        control,
    });

    return (
        <Theme.FormGroup>
            <Label htmlFor={name} text={label} />
            <Theme.Input
                id={name}
                type={type}
                placeholder={placeholder}
                {...{ ...rest, ...field }}
            />
            {fieldError?.message && <Hint text={fieldError?.message} />}
        </Theme.FormGroup>
    );
};

export default InputControllerComponent;
