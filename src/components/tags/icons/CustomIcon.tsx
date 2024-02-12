import { styled } from "@mui/system";

export interface IconProjectsProps {
  color?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
}
interface CustomIconProps {
  color?: string;
  width?: string;
  height?: string;
}

export const CustomIcon = styled("svg")<CustomIconProps>(
  ({ color, width, height }) => {
    return {
      fill: color,
      width: width || "24px",
      height: height || "24px",
    };
  }
);
