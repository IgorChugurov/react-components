import { CustomIcon, IconProjectsProps } from "./CustomIcon";
export const ClearOutlinedIcon: React.FC<IconProjectsProps> = ({
  color,
  width,
  height,
}) => {
  return (
    <CustomIcon color={color} width={width} height={height}>
      <polygon points="8 1.01818182 6.98181818 0 4 2.98181818 1.01818182 0 0 1.01818182 2.98181818 4 0 6.98181818 1.01818182 8 4 5.01818182 6.98181818 8 8 6.98181818 5.01818182 4"></polygon>
    </CustomIcon>
  );
};
