import { Button, Divider, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { CloseOutlinedIcon } from "../icons/CloseOutlinedIcon";

interface IProps {
  openModal: boolean;
  handleCloseModal: () => void;
  modalTitle: string;
  setOpenModal: (val: boolean) => void;
  handleAction: () => void;
  darkMode?: string;
  sx?: any;
}
const initStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: { xs: "95%", sm: "95%", md: "90%", lg: "80%" },
  maxWidth: "560px",
  backgroundColor: "#FFFFFF",
  borderRadius: "15px",
  "&:focus-visible": {
    outline: "none",
  },
  // width: 410,
  // bgcolor: "background.default",
  // border: "0.5px solid #9b9b9b",
  // boxShadow: 24,
  //p: "20px",
};
const ConfirmModal = ({
  openModal,
  handleCloseModal,
  modalTitle,
  setOpenModal,
  handleAction,
  darkMode = "ligth",
  sx = {},
}: IProps) => {
  const [checkData, setCheckData] = useState(false);
  const handleConfirm = () => {
    handleAction();
  };
  const style = { ...initStyle, ...sx };
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        BackdropProps={
          darkMode === "dark"
            ? { style: { backgroundColor: "rgb(255, 255, 255,0.15)" } }
            : {}
        }
      >
        <Box sx={style}>
          <Box
            sx={{
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
            }}
          >
            <Typography
              sx={{ textAlign: "center" }}
              variant="h6"
              component="div"
              color="text.secondary"
              className="whitespace-normal"
            >
              Confirm the action
            </Typography>
            <Box
              sx={{
                color: "text.secondary",
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                "&:hover": {
                  color: "text.primary",
                  cursor: "pointer",
                  backgroundColor: "action.hover",
                },
              }}
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <CloseOutlinedIcon />
            </Box>
          </Box>

          <Divider />
          <Box sx={{ m: "20px" }}>
            <Typography variant="body2" color="text.secondary">
              {" "}
              {modalTitle}
            </Typography>
          </Box>

          <Divider sx={{ mt: "20px" }} />

          <Box sx={{ px: "20px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                py: "15px",
                gap: "20px",
              }}
            >
              <Button
                size="small"
                variant="outlined"
                className="deleteNo"
                onClick={(e) => setOpenModal(false)}
              >
                Cancel
              </Button>
              <Button
                size="small"
                color="error"
                variant="contained"
                className="deleteYes"
                onClick={(e) => {
                  setOpenModal(false);
                  handleConfirm();
                }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
