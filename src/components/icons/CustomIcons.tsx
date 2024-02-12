import React from "react";
import { styled, Theme } from "@mui/system";
import { SxProps } from "@mui/system";

interface CustomIconProps {
  iconColor?: string;
  sx?: any & { width?: string; height?: string };
  stroked?: boolean | undefined;
}
function getThemeColor(theme: any, arr: string[]) {
  let i = 2;
  let color = theme.palette[arr[i]];
  if (color && typeof color === "string") {
    return color;
  } else if (typeof color === undefined || typeof color === "undefined") {
    return theme.palette.primary.main;
  } else if (typeof color === "object") {
    while (typeof color !== "string") {
      i++;
      if (
        !arr[i] ||
        (arr[i] &&
          (typeof color[arr[i]] === "undefined" ||
            typeof color[arr[i]] === undefined))
      ) {
        return theme.palette.primary.main;
      }
      color = color[arr[i]];
    }
    return color;
  }
}
const CustomIcon = styled("svg")<CustomIconProps>(
  ({ theme, iconColor, sx, stroked }) => {
    const arr = iconColor?.split(".");
    const resolvedColor =
      arr && arr[0] && arr[0] === "theme" && arr[1] === "palette" && arr[2]
        ? getThemeColor(theme, arr)
        : iconColor;
    return {
      fill: resolvedColor || theme.palette.primary.main,
      width: sx?.width || "24px",
      height: sx?.height || "24px",
      ...(sx || {}),
      stroke:
        stroked !== undefined
          ? stroked
            ? resolvedColor || theme.palette.primary.main
            : "none"
          : undefined,
      //stroke: stroke ? resolvedColor || theme.palette.primary.main : "none",
    };
  }
);

interface IconProjectsProps {
  iconColor?: string;
  sx?: SxProps<Theme> & { width?: string; height?: string };
  stroked?: boolean | undefined;
  onClick?: () => void;
}

export const IconProjects: React.FC<IconProjectsProps> = ({
  iconColor,
  sx,
}) => {
  return (
    <CustomIcon iconColor={iconColor} sx={sx}>
      <path d="M20 18H4V8H20M20 6H12L10 4H4C2.89 4 2 4.89 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V8C22 6.89 21.1 6 20 6Z" />
    </CustomIcon>
  );
};
export const Folder_open: React.FC<IconProjectsProps> = ({ iconColor, sx }) => {
  return (
    <CustomIcon iconColor={iconColor} sx={sx}>
      <mask
        id="mask0_2006_107"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2006_107)">
        <path
          d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H10L12 6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8H11.175L9.175 6H4V18L6.4 10H23.5L20.925 18.575C20.7917 19.0083 20.5458 19.3542 20.1875 19.6125C19.8292 19.8708 19.4333 20 19 20H4ZM6.1 18H19L20.8 12H7.9L6.1 18Z"
          fill="#171717"
        />
      </g>
    </CustomIcon>
  );
};
