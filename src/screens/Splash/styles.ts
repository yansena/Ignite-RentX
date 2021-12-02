import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    background-color: ${({ theme }) => theme.colors.header };
`;