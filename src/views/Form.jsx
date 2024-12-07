import { useNavigate, useParams } from "react-router-dom";
import { Button, Diaper, Eat, Sleep, Grid, AppBar } from "../components";
import { useEffect, useState } from "react";
import { deleteItem, fetchItem, saveItem, updateItem } from "../services/database";
import { getFormTitle, validateFormFields } from "../utils/action";
import dayjs from 'dayjs';
import { useAppContext } from '../Context';
import { useTheme } from '@mui/material/styles';

const Form = () => {
  const navigate = useNavigate();
  const { type: actionType, id } = useParams();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useAppContext();
  const theme = useTheme();

  const renderFormComponent = () => {
    const formProps = { data: formData, setData: setFormData };
    switch (actionType) {
      case "1":
        return <Sleep {...formProps} />;
      case "2":
        return <Eat {...formProps} />;
      case "3":
        return <Diaper {...formProps} />;
      default:
        return <Eat {...formProps} />;
    }
  };

  useEffect(() => {
    if (id) {
      const item = fetchItem(id);
      if (item) {
        const dateFields = ['startTime', 'endTime', 'time'];
        const processedItem = { ...item };
        dateFields.forEach(field => {
          if (item[field]) processedItem[field] = dayjs(item[field]);
        });
        setFormData(processedItem);
      } else {
        alert(t("item_not_found"));
        navigate("/home");
      }
    }
  }, [id, navigate, t]);

  const handleSave = () => {
    const missingFields = validateFormFields(formData, actionType, t);
    if (missingFields.length) {
      alert(`${t("required_fields")}: ${missingFields.join(", ")}`);
      return;
    }
    setIsLoading(true);
    try {
      const dateFields = ['startTime', 'endTime', 'time'];
      const dataToSave = { ...formData };
      dateFields.forEach(field => {
        if (formData[field]) dataToSave[field] = formData[field].toISOString();
      });
      if (id) {
        updateItem(dataToSave, id);
      } else {
        saveItem({ ...dataToSave, action_type: actionType });
      }
      alert(t("save_success"));
      navigate("/home");
    } catch (error) {
      alert(t("save_error", { error: error.message }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm(t("delete_confirmation"))) {
      deleteItem(id);
      alert(t("delete_success"));
      navigate("/home");
    }
  };

  const formTitle = t(getFormTitle(actionType));

  return (
    <div style={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
      <AppBar title={formTitle} showBackButton onDelete={id ? handleDelete : null} />
      <Grid container spacing={2} sx={{ marginTop: "1em", padding: "2em" }}>
        <Grid item xs={12}>
          {renderFormComponent()}
          <Button
            isLoading={isLoading}
            onClick={handleSave}
            sx={{
              marginTop: "1em",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            {t("save")}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
