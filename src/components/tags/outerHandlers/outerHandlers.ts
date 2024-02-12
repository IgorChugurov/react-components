export const outerHandlersAdd = ({
  handleSuscribeAddTagInRecord,
  handleSuscribeDeleteTagInRecord,
  handleSuscribeUpdateRecord,
  handleSuscribeReloadRecordcList,
  handleSuscribeUpdateTag,
  handleSuscribeDeleteTag,
}: {
  handleSuscribeAddTagInRecord: (event: CustomEvent) => void;
  handleSuscribeDeleteTagInRecord: (event: CustomEvent) => void;
  handleSuscribeUpdateRecord: (event: CustomEvent) => void;
  handleSuscribeReloadRecordcList: (event: CustomEvent) => void;
  handleSuscribeUpdateTag: (event: CustomEvent) => void;
  handleSuscribeDeleteTag: (event: CustomEvent) => void;
}) => {
  window.addEventListener(
    "addTagInRecord",
    handleSuscribeAddTagInRecord as EventListener
  );
  window.addEventListener(
    "deleteTagInRecord",
    handleSuscribeDeleteTagInRecord as EventListener
  );
  window.addEventListener(
    "updateRecord",
    handleSuscribeUpdateRecord as EventListener
  );
  window.addEventListener(
    "reloadRecordcList",
    handleSuscribeReloadRecordcList as EventListener
  );
  window.addEventListener(
    "updateTag",
    handleSuscribeUpdateTag as EventListener
  );
  window.addEventListener(
    "deleteTag",
    handleSuscribeDeleteTag as EventListener
  );
};

export const outerHandlersRemove = ({
  handleSuscribeAddTagInRecord,
  handleSuscribeDeleteTagInRecord,
  handleSuscribeUpdateRecord,
  handleSuscribeReloadRecordcList,
  handleSuscribeUpdateTag,
  handleSuscribeDeleteTag,
}: {
  handleSuscribeAddTagInRecord: (event: CustomEvent) => void;
  handleSuscribeDeleteTagInRecord: (event: CustomEvent) => void;
  handleSuscribeUpdateRecord: (event: CustomEvent) => void;
  handleSuscribeReloadRecordcList: (event: CustomEvent) => void;
  handleSuscribeUpdateTag: (event: CustomEvent) => void;
  handleSuscribeDeleteTag: (event: CustomEvent) => void;
}) => {
  window.addEventListener(
    "addTagInRecord",
    handleSuscribeAddTagInRecord as EventListener
  );
  window.addEventListener(
    "deleteTagInRecord",
    handleSuscribeDeleteTagInRecord as EventListener
  );
  window.addEventListener(
    "updateRecord",
    handleSuscribeUpdateRecord as EventListener
  );
  window.addEventListener(
    "reloadRecordcList",
    handleSuscribeReloadRecordcList as EventListener
  );
  window.addEventListener(
    "updateTag",
    handleSuscribeUpdateTag as EventListener
  );
  window.addEventListener(
    "deleteTag",
    handleSuscribeDeleteTag as EventListener
  );
};
