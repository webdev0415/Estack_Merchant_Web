import styled from 'styled-components';
import { Button, Form } from 'antd';

export const TextButton = styled(Button)`
  border-color: transparent;
  background: transparent;
  border: none;
  &:hover {
    border: none !important;
  }
`;

export const LinkButton = styled(Button)` 
  &:hover {
    background: #fff;
  }
`;

export const FormItem = styled(Form.Item)` 
  margin: 0 !important
`;

export const FlexWrapper = styled.div` 
    display:flex;
    justify-content: space-between;;
`;
