import React, { useState } from "react";
import { Theme } from "@mui/system";
import { SxProps } from "@mui/system";

interface IconProjectsProps {
  iconColor?: string;
  hoverColor?: string;
  sx?: SxProps<Theme> & { width?: string; height?: string };
  stroked?: boolean | undefined;
  onClick?: (e: any) => void;
  className?: string;
}

export const Icon_Edit_inSelect: React.FC<IconProjectsProps> = ({
  iconColor,
  hoverColor,
  sx,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={isHovered ? hoverColor : "none"}
      onClick={handleClick}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <mask
        id="mask0_2199_4252"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2199_4252)">
        <path
          d="M3.33333 12.6667H4.28333L10.8 6.15L9.85 5.2L3.33333 11.7167V12.6667ZM2 14V11.1667L10.8 2.38333C10.9333 2.26111 11.0806 2.16667 11.2417 2.1C11.4028 2.03333 11.5722 2 11.75 2C11.9278 2 12.1 2.03333 12.2667 2.1C12.4333 2.16667 12.5778 2.26667 12.7 2.4L13.6167 3.33333C13.75 3.45556 13.8472 3.6 13.9083 3.76667C13.9694 3.93333 14 4.1 14 4.26667C14 4.44444 13.9694 4.61389 13.9083 4.775C13.8472 4.93611 13.75 5.08333 13.6167 5.21667L4.83333 14H2ZM10.3167 5.68333L9.85 5.2L10.8 6.15L10.3167 5.68333Z"
          fill={isHovered ? hoverColor : "#656565"}
        />
      </g>
    </svg>
  );
};
export const Icon_Delete_inSelect: React.FC<IconProjectsProps> = ({
  iconColor,
  hoverColor,
  sx,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={isHovered ? hoverColor : "none"}
      onClick={handleClick}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <mask
        id="mask0_2199_4255"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2199_4255)">
        <path
          d="M4.66675 14C4.30008 14 3.98619 13.8694 3.72508 13.6083C3.46397 13.3472 3.33341 13.0333 3.33341 12.6667V4H2.66675V2.66667H6.00008V2H10.0001V2.66667H13.3334V4H12.6667V12.6667C12.6667 13.0333 12.5362 13.3472 12.2751 13.6083C12.014 13.8694 11.7001 14 11.3334 14H4.66675ZM11.3334 4H4.66675V12.6667H11.3334V4ZM6.00008 11.3333H7.33341V5.33333H6.00008V11.3333ZM8.66675 11.3333H10.0001V5.33333H8.66675V11.3333Z"
          fill={isHovered ? hoverColor : "#656565"}
        />
      </g>
    </svg>
  );
};
export const Icon_Done_inSelect: React.FC<IconProjectsProps> = ({
  iconColor,
  sx,
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2195_370"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2195_370)">
        <path
          d="M6.36665 12.0001L2.56665 8.20007L3.51665 7.25006L6.36665 10.1001L12.4833 3.9834L13.4333 4.9334L6.36665 12.0001Z"
          fill="#35B655"
        />
      </g>
    </svg>
  );
};
export const Icon_Cancel_inSelect: React.FC<IconProjectsProps> = ({
  iconColor,
  sx,
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2242_387"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2242_387)">
        <path
          d="M4.26659 12.6663L3.33325 11.733L7.06659 7.99967L3.33325 4.26634L4.26659 3.33301L7.99992 7.06634L11.7333 3.33301L12.6666 4.26634L8.93325 7.99967L12.6666 11.733L11.7333 12.6663L7.99992 8.93301L4.26659 12.6663Z"
          fill="#FF453A"
        />
      </g>
    </svg>
  );
};
export const Icon_Add_inSelect: React.FC<IconProjectsProps> = ({
  iconColor,
  sx,
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2219_4970"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2219_4970)">
        <path
          d="M7.33325 8.66683H3.33325V7.3335H7.33325V3.3335H8.66659V7.3335H12.6666V8.66683H8.66659V12.6668H7.33325V8.66683Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};
export const Icon_attach_file: React.FC<IconProjectsProps> = ({
  iconColor,
  sx,
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2242_852"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="12"
        height="12"
      >
        <rect width="12" height="12" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2242_852)">
        <path
          d="M9 7.875C9 8.74167 8.69583 9.47917 8.0875 10.0875C7.47917 10.6958 6.74167 11 5.875 11C5.00833 11 4.27083 10.6958 3.6625 10.0875C3.05417 9.47917 2.75 8.74167 2.75 7.875V3.25C2.75 2.625 2.96875 2.09375 3.40625 1.65625C3.84375 1.21875 4.375 1 5 1C5.625 1 6.15625 1.21875 6.59375 1.65625C7.03125 2.09375 7.25 2.625 7.25 3.25V7.625C7.25 8.00833 7.11667 8.33333 6.85 8.6C6.58333 8.86667 6.25833 9 5.875 9C5.49167 9 5.16667 8.86667 4.9 8.6C4.63333 8.33333 4.5 8.00833 4.5 7.625V3H5.5V7.625C5.5 7.73333 5.53542 7.82292 5.60625 7.89375C5.67708 7.96458 5.76667 8 5.875 8C5.98333 8 6.07292 7.96458 6.14375 7.89375C6.21458 7.82292 6.25 7.73333 6.25 7.625V3.25C6.24167 2.9 6.11875 2.60417 5.88125 2.3625C5.64375 2.12083 5.35 2 5 2C4.65 2 4.35417 2.12083 4.1125 2.3625C3.87083 2.60417 3.75 2.9 3.75 3.25V7.875C3.74167 8.46667 3.94583 8.96875 4.3625 9.38125C4.77917 9.79375 5.28333 10 5.875 10C6.45833 10 6.95417 9.79375 7.3625 9.38125C7.77083 8.96875 7.98333 8.46667 8 7.875V3H9V7.875Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};
export const Icon_close: React.FC<IconProjectsProps> = ({
  iconColor,
  sx,
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2059_7246"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2059_7246)">
        <path
          d="M4.26659 12.6663L3.33325 11.733L7.06659 7.99967L3.33325 4.26634L4.26659 3.33301L7.99992 7.06634L11.7333 3.33301L12.6666 4.26634L8.93325 7.99967L12.6666 11.733L11.7333 12.6663L7.99992 8.93301L4.26659 12.6663Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};

export const IconSearch_inSelect: React.FC<IconProjectsProps> = ({
  iconColor,
  hoverColor,
  sx,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2294_5314"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2294_5314)">
        <path
          d="M13.0667 14L8.86667 9.8C8.53333 10.0667 8.15 10.2778 7.71667 10.4333C7.28333 10.5889 6.82222 10.6667 6.33333 10.6667C5.12222 10.6667 4.09722 10.2472 3.25833 9.40833C2.41944 8.56944 2 7.54444 2 6.33333C2 5.12222 2.41944 4.09722 3.25833 3.25833C4.09722 2.41944 5.12222 2 6.33333 2C7.54444 2 8.56944 2.41944 9.40833 3.25833C10.2472 4.09722 10.6667 5.12222 10.6667 6.33333C10.6667 6.82222 10.5889 7.28333 10.4333 7.71667C10.2778 8.15 10.0667 8.53333 9.8 8.86667L14 13.0667L13.0667 14ZM6.33333 9.33333C7.16667 9.33333 7.875 9.04167 8.45833 8.45833C9.04167 7.875 9.33333 7.16667 9.33333 6.33333C9.33333 5.5 9.04167 4.79167 8.45833 4.20833C7.875 3.625 7.16667 3.33333 6.33333 3.33333C5.5 3.33333 4.79167 3.625 4.20833 4.20833C3.625 4.79167 3.33333 5.5 3.33333 6.33333C3.33333 7.16667 3.625 7.875 4.20833 8.45833C4.79167 9.04167 5.5 9.33333 6.33333 9.33333Z"
          fill="#7C7C7C"
        />
      </g>
    </svg>
  );
};
export const Icon_expand_more: React.FC<IconProjectsProps> = ({
  iconColor,
  hoverColor,
  sx,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2294_1590"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2294_1590)">
        <path
          d="M8 10.25L4 6.25001L4.93333 5.31668L8 8.38335L11.0667 5.31668L12 6.25001L8 10.25Z"
          fill="white"
        />
      </g>
    </svg>
  );
};
export const Icon_shoppingmode: React.FC<IconProjectsProps> = ({
  iconColor,
  hoverColor,
  sx,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2294_1137"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="12"
        height="12"
      >
        <rect width="12" height="12" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2294_1137)">
        <path
          d="M6.2875 10.7C6.0875 10.9 5.85 11 5.575 11C5.3 11 5.0625 10.9 4.8625 10.7L1.2875 7.125C1.09583 6.93333 1 6.69792 1 6.41875C1 6.13958 1.09583 5.90417 1.2875 5.7125L5.6875 1.3C5.77917 1.20833 5.8875 1.13542 6.0125 1.08125C6.1375 1.02708 6.27083 1 6.4125 1H9.9875C10.2625 1 10.4979 1.09792 10.6938 1.29375C10.8896 1.48958 10.9875 1.725 10.9875 2V5.575C10.9875 5.71667 10.9604 5.85 10.9062 5.975C10.8521 6.1 10.7792 6.20833 10.6875 6.3L6.2875 10.7ZM8.7375 4C8.94583 4 9.12292 3.92708 9.26875 3.78125C9.41458 3.63542 9.4875 3.45833 9.4875 3.25C9.4875 3.04167 9.41458 2.86458 9.26875 2.71875C9.12292 2.57292 8.94583 2.5 8.7375 2.5C8.52917 2.5 8.35208 2.57292 8.20625 2.71875C8.06042 2.86458 7.9875 3.04167 7.9875 3.25C7.9875 3.45833 8.06042 3.63542 8.20625 3.78125C8.35208 3.92708 8.52917 4 8.7375 4ZM5.575 10L9.9875 5.575V2H6.4125L2 6.425L5.575 10Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};
export const Icon_checkbox: React.FC<IconProjectsProps> = ({
  iconColor,
  hoverColor,
  sx,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2294_39"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2294_39)">
        <path
          d="M7.06667 10.8L11.7667 6.1L10.8333 5.16667L7.06667 8.93333L5.16667 7.03333L4.23333 7.96667L7.06667 10.8ZM3.33333 14C2.96667 14 2.65278 13.8694 2.39167 13.6083C2.13056 13.3472 2 13.0333 2 12.6667V3.33333C2 2.96667 2.13056 2.65278 2.39167 2.39167C2.65278 2.13056 2.96667 2 3.33333 2H12.6667C13.0333 2 13.3472 2.13056 13.6083 2.39167C13.8694 2.65278 14 2.96667 14 3.33333V12.6667C14 13.0333 13.8694 13.3472 13.6083 13.6083C13.3472 13.8694 13.0333 14 12.6667 14H3.33333Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};
export const Icon_clear_search: React.FC<IconProjectsProps> = ({
  iconColor,
  hoverColor,
  sx,
  onClick,
  className,
}) => {
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2529_11925"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2529_11925)">
        <path
          d="M4.26683 12.6663L3.3335 11.733L7.06683 7.99967L3.3335 4.26634L4.26683 3.33301L8.00016 7.06634L11.7335 3.33301L12.6668 4.26634L8.9335 7.99967L12.6668 11.733L11.7335 12.6663L8.00016 8.93301L4.26683 12.6663Z"
          fill="#656565"
        />
      </g>
    </svg>
  );
};
