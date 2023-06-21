import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    children?: React.ReactNode;
    variant?: 'primary' | 'error';
    color?: 'black' | 'sand' | 'red' | 'orange';
    size?: 'xl' | 'lg' | 'md' | 'sm';
    target?: '_self' | '_blank';
    loading?: Boolean;
    fullWidth?: Boolean;
    loaderColor?: string;
}

const Box = styled.button<ButtonProps>``;

export const Button = React.memo(
    ({
        children,
        loading,
        target,
        loaderColor = '#ffffff',
        ...props
    }: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
        <Box {...props} target={target} data-cmp="Button">
            {loading ? 'loading...' : children}
        </Box>
    ),
);
