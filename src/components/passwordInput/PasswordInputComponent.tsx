import React, { useState } from 'react';
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

const PasswordInputComponent: React.FC<InputProps> = ({
    name,
    control,
    label,
    placeholder,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
            <div className="relative">
                <Theme.Input
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    {...{ ...rest, ...field }}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg text-sm"
                >
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
            {fieldError?.message && <Hint text={fieldError?.message} />}
        </Theme.FormGroup>
    );
};

export default PasswordInputComponent;
