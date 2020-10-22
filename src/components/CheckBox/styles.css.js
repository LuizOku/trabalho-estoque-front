import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
  justify-content: space-between;
  min-height: 40px;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 4px;
  padding: 0 8px 5px 8px;
`;

export const InputContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  border: none;
  display: flex;
  align-items: center;
  color: #777777;
  input {
    margin-right: 5px;
  }
`;


