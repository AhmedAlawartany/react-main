import styled from 'styled-components';

export const LayoutBody = styled.div`
    width: 100%;
    background: #fbfbfb;
    height: 100%;
`;

export const LayoutChild = styled.div`
    width: calc(100% - 200px);
    height: calc(100vh - 64px);
    overflow-y: auto;
    scrollbar-gutter: stable both-edges;
    ::-webkit-scrollbar {
        width: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f8f8f8;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #bdbdbd;
        border-radius: 4px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #bdbdbd;
    }
    @media only screen and (max-width: 1366px) {
        width: calc(100% - 46px);
    }
`;

export const Box = styled.div`
    color: #fff;
    display: flex;
    background: #00000050;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100000;
`;
