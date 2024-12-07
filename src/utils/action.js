const getFormTitle = (actionType) => {
  const titles = {
    "1": "form_title_sleep",
    "2": "form_title_feeding",
    "3": "form_title_diaper",
  };
  return titles[actionType] || "form_title_feeding";
};

const validateFormFields = (data, actionType, t) => {
  let requiredFields = [];

  switch (actionType) {
    case "1":
      requiredFields = ["startTime", "endTime"];
      break;
    case "2":
      requiredFields = ["type", "startTime", "endTime"];
      if (data.type === "bottle") requiredFields.push("quantity");
      else if (data.type === "breast") requiredFields.push("side");
      break;
    case "3":
      requiredFields = ["type", "time"];
      break;
    default:
      break;
  }

  const missingFields = requiredFields.filter(
    (field) => data[field] === undefined || data[field] === null || data[field] === ""
  );

  const fieldLabels = {
    startTime: t("start_time"),
    endTime: t("end_time"),
    type: t("type"),
    quantity: t("quantity_ml"),
    side: t("side"),
    time: t("change_time"),
  };

  return missingFields.map((field) => fieldLabels[field] || field);
};

export { getFormTitle, validateFormFields };
