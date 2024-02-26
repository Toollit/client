import styled from '@emotion/styled';
import { Person, PermIdentity } from '@mui/icons-material';
import { IconProps } from '../types';

const CustomPerson = styled(Person)<{
  width: number;
  height: number;
  // color: string;
}>`
  width: ${(props) => `${props.width}rem`};
  height: ${(props) => `${props.height}rem`};
  border: 2px solid #0d1117;
  border-radius: 50%;
  background-color: #fff;
`;

const CustomPermIdentity = styled(PermIdentity)<{
  width: number;
  height: number;
}>`
  width: ${(props) => `${props.width}rem`};
  height: ${(props) => `${props.height}rem`};
  border: 2px solid #0d1117;
  border-radius: 50%;
  background-color: #fff;
`;

export const NoImagePersonIcon = ({
  fill = false,
  width = 2.4,
  height = 2.4,
  color,
}: IconProps) => {
  if (!fill) {
    return <CustomPerson width={width} height={height} />;
  }

  if (fill) {
    return <CustomPermIdentity width={width} height={height} />;
  }

  return null;
};
