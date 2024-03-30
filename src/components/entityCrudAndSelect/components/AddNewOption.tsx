import { Icon_Add_inSelect } from "../icon/CustomIcon";
import styles from "../css/addNewOption.module.css";
import styles_typography from "../css/global_typography.module.css";

const AddNewOption = ({
  newOptionName,
  classForNewOptionText,
  createNewOption,
  classForNewOptionItem,
}: {
  classForNewOptionText?: string;
  classForNewOptionItem?: string;
  newOptionName: string;
  createNewOption: () => void;
}) => {
  return (
    <>
      <Icon_Add_inSelect
        className={styles_typography.cursorPointer}
        onClick={(e) => {
          e.stopPropagation();
          createNewOption();
        }}
      />
      <div className={styles.container}>
        <span
          className={[
            classForNewOptionText
              ? classForNewOptionText
              : styles_typography.body_s_regular,
            styles_typography.colorGreyBlack,
            styles_typography.cursorPointer,
          ].join(" ")}
          onClick={(e) => {
            e.stopPropagation();
            createNewOption();
          }}
        >
          Create
        </span>
        <span
          style={{ width: "100%" }}
          className={[
            classForNewOptionItem
              ? classForNewOptionText
              : styles_typography.body_s_medium,
            styles_typography.colorGreyBlack,
          ].join(" ")}
          onClick={(e) => {
            e.stopPropagation();
            createNewOption();
          }}
        >
          {newOptionName}
        </span>
      </div>
    </>
  );
};
export default AddNewOption;
