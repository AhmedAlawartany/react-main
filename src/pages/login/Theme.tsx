import ButtonComponent from '@/components/button/ButtonComponent';
import styled from 'styled-components';

export const Body = styled.form.attrs({
    className:
        'flex items-center justify-center w-full flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4',
})``;

export const FormSection = styled.section.attrs({
    className:
        'flex flex-col justify-center items-center bg-white dark:bg-gray-800 p-6 md:p-10 rounded-lg shadow-md w-full max-w-md',
})``;

export const FormTitle = styled.h2.attrs({
    className: 'text-2xl font-bold mb-6',
})``;

export const FormSubtitle = styled.h5.attrs({
    className: 'text-lg mb-6',
})``;

export const Button = styled(ButtonComponent).attrs({
    className:
        'w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400',
})``;

export const Errors = styled.div.attrs({
    className: 'flex justify-center items-center text-red-500 h-10 truncate capitalize',
})``;

export const ErrorText = styled.p.attrs({
    className: 'text-red-500 mt-1',
})``;
