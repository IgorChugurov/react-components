export const outerHandlersAdd = ({
  handleSuscribeAddTagInRecord,
  handleSuscribeDeleteTagInRecord,
}: {
  handleSuscribeAddTagInRecord: (event: CustomEvent) => void;
  handleSuscribeDeleteTagInRecord: (event: CustomEvent) => void;
}) => {
  window.addEventListener(
    "addTagInRecord",
    handleSuscribeAddTagInRecord as EventListener
  );
  window.addEventListener(
    "deleteTagInRecord",
    handleSuscribeDeleteTagInRecord as EventListener
  );
};

export const outerHandlersRemove = ({
  handleSuscribeAddTagInRecord,
  handleSuscribeDeleteTagInRecord,
}: {
  handleSuscribeAddTagInRecord: (event: CustomEvent) => void;
  handleSuscribeDeleteTagInRecord: (event: CustomEvent) => void;
}) => {
  window.addEventListener(
    "addTagInRecord",
    handleSuscribeAddTagInRecord as EventListener
  );
  window.addEventListener(
    "deleteTagInRecord",
    handleSuscribeDeleteTagInRecord as EventListener
  );
};
