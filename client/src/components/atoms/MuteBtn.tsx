import styled from 'styled-components';
import theme from '../../style/theme';
import { ReactComponent as ToMuteIcon } from '../../assets/image/etc/mingcute_volume-fill.svg';
import { ReactComponent as ToUnMuteIcon } from '../../assets/image/etc/mingcute_volume-mute-fill.svg';

interface MuteProps {
  isActive: boolean;
  onClick: () => void;
}
const StyledMuteIcon = styled(ToMuteIcon)`
  cursor: pointer;
  width: 4.0625rem;
  height: 4.0625rem;
`;
const StyledUnMuteIcon = styled(ToUnMuteIcon)`
  cursor: pointer;
  width: 4.0625rem;
  height: 4.0625rem;
`;
const VolumeBtn = ({ isActive, onClick }: MuteProps) => {
  let content;
  if (isActive) {
    content = <StyledUnMuteIcon onClick={onClick} />;
  } else {
    content = <StyledMuteIcon onClick={onClick} />;
  }
  return content;
};

export default VolumeBtn;
