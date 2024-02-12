import { CustomIcon, IconProjectsProps } from "./CustomIcon";
export const MoreHorizIcon: React.FC<IconProjectsProps> = ({
  color,
  width,
  height,
}) => {
  return (
    <CustomIcon color={color} width={width} height={height}>
      <g>
        <path d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"></path>
        <path d="M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z"></path>
        <path d="M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z"></path>
      </g>
    </CustomIcon>
  );
};
