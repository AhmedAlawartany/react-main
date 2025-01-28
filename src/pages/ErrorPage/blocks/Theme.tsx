import styled from 'styled-components';

const ErrorPageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    justify-content: center;
    align-items: center;
    > p {
        font-size: 20px;
    }
    > button {
        cursor: pointer;
        height: 40px;
        border-radius: 24px;
        padding: 8px 16px;
        color: #fff;
        font-size: 15px;
        background-color: #1d99ff;
    }
`;

export { ErrorPageContainer };
