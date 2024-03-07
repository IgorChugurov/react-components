import { Typography } from "@mui/material";
import styles from "../css/labelBlock.module.css";
import { useEffect, useRef } from "react";
import styles_typography from "../css/global_typography.module.css";

const LabelBlock = ({
  required,
  label,
  value,
  clearValue,
  isInvalid,
  disabled,
  anchorEl,
}: {
  required?: boolean;
  label: string;
  value: string;
  clearValue: () => void;
  isInvalid?: boolean;
  disabled?: boolean;
  anchorEl: null | HTMLElement;
}) => {
  const labelRef = useRef(null);
  const updateColors = () => {
    const labelColor =
      isInvalid && required
        ? "var(--system-error,#ff453a)"
        : disabled
        ? "var(--grey-300,#bdbdbd)"
        : anchorEl
        ? "var(--primary-600,#0768fd)"
        : "var(--grey-600,#656565)";

    if (labelRef.current) {
      const el = labelRef.current as HTMLElement;
      el.style.setProperty("--label-color", labelColor);
    }
  };

  useEffect(() => {
    updateColors();
  }, [isInvalid, disabled, anchorEl]);

  return (
    <div className={styles.label}>
      <div className={styles.labelBox}>
        <span
          className={styles_typography.body_xs_regular}
          ref={labelRef}
          style={{ color: "var(--label-color)" }}
        >
          {label}
        </span>
        {required && (
          <span
            className={styles_typography.body_xs_regular}
            style={{ color: "var(--system-error)" }}
          >
            *
          </span>
        )}
      </div>
      {!required && value !== "none" && (
        <span
          className={[
            styles_typography.body_xs_regular,
            styles_typography.colorGreyBlack,
            styles_typography.cursorPointer,
          ].join(" ")}
          onClick={clearValue}
        >
          Clear
        </span>
      )}
    </div>
  );
};

export default LabelBlock;
