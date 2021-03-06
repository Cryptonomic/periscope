import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';

export const CustomButton = styled.div`
  cursor: pointer;
  border-radius: 9px;
  height: 42px;
  width: 158px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
`;

export const DismissButton = styled(CustomButton)`
  color: white;
  background: rgb(86, 194, 217);
`;

export const DialogContentWrapper = withStyles({
  root: {
    minWidth: '350px'
  }
})(DialogContent);