import styled from "styled-components";

const LinkStyle = styled.p`
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  margin: 10px;
`;

interface Props {
  content: string;
}

const LinkStyled = ({ content }: Props) => <LinkStyle>{content}</LinkStyle>;

export default LinkStyled;
