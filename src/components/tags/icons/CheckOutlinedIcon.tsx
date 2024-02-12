import { CustomIcon, IconProjectsProps } from "./CustomIcon";
export const CheckOutlinedIcon: React.FC<IconProjectsProps> = ({
  color,
  width,
  height,
}) => {
  return (
    <CustomIcon color={color} width={width} height={height}>
      <path d="M6.385 14.162c.362 0 .642-.15.84-.444L13.652 3.71c.144-.226.205-.417.205-.602 0-.485-.341-.82-.833-.82-.335 0-.54.123-.746.444l-5.926 9.4-3.042-3.903c-.205-.267-.417-.376-.718-.376-.492 0-.848.348-.848.827 0 .212.075.417.253.629l3.541 4.416c.24.3.492.437.848.437z"></path>
    </CustomIcon>
  );
};
