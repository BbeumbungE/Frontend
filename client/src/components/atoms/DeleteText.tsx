import styled from 'styled-components';
import theme from '../../style/theme';

interface DeleteTextProps {
  content: string;
  onClick: () => void;
}

const DeleteSpan = styled.span`
  font-size: 1.2rem;
  font-family: 'TmoneyRoundWindRegular';
  color: ${theme.colors.mainGray};
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 3.125rem;
`;

const DeleteText = ({ content, onClick }: DeleteTextProps) => {
  return <DeleteSpan onClick={onClick}>{content}</DeleteSpan>;
};

export default DeleteText;
