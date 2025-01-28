import styled from 'styled-components';

const Wrap = styled.div`
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
`;

function Container({ children, ...rest }: { [key: string]: any }) {
    return <Wrap {...rest}>{children}</Wrap>;
}
export default Container;
