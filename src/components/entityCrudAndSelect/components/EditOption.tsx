import { Dispatch, SetStateAction } from "react";
import { Icon_Cancel_inSelect, Icon_Done_inSelect } from "../icon/CustomIcon";
import styles from "../css/editCurrentOption.module.css";

const EditCurrentOption = <T extends { _id: string; name: string }>({
  enterKeyPress,
  loading,
  currentOption,
  setCurrentOption,
  updateData,
  setEditableOption,
  option,
}: {
  enterKeyPress: (e: any) => void;
  loading: boolean;
  currentOption: T | null;
  setCurrentOption: Dispatch<SetStateAction<T | null>>;
  updateData: () => void;
  setEditableOption: (d: T | null) => void;
  option: T;
}) => {
  const determineClass = () => {
    if (currentOption?.name === "") {
      return styles.input_class_empty;
    }
    return styles.input_class;
  };

  return (
    <div className={styles.container}>
      <input
        className={determineClass()}
        onKeyDown={enterKeyPress}
        disabled={loading}
        value={currentOption?.name}
        onChange={(e) => {
          setCurrentOption((prevState) => {
            const newState = prevState
              ? { ...prevState, name: e.target.value }
              : ({ name: e.target.value } as T);
            return newState;
          });
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        id={`input_${option._id}`}
        placeholder={"Enter a name"}
        autoComplete="new-password"
        {...{ meta: { autocomplete: "off" } }}
      />
      <div className={styles.iconWrapper}>
        <Icon_Done_inSelect
          className={styles.iconDone}
          onClick={(e) => {
            updateData();
          }}
        />
        <Icon_Cancel_inSelect
          className={styles.iconCancel}
          onClick={(e) => {
            if (loading) {
              return;
            }
            setEditableOption(null);
          }}
        />
      </div>
    </div>
  );
};

export default EditCurrentOption;
