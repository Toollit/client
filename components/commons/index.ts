import styled from '@emotion/styled';

export interface ImageSize {
  width: string;
  height: string;
}
const ImageContainer = styled.div<ImageSize>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export { ImageContainer };
