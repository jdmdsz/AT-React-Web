import CribIcon from '@mui/icons-material/Crib';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import { useAppContext } from '../Context'; 

const ACTIONS = () => {
  const { t } = useAppContext(); 

  return [
    {
      title: t("sleep"), 
      actionType: 1,
      Icon: CribIcon,
      color: '#22535d',
    },
    {
      title: t("feeding"),
      actionType: 2,
      Icon: RestaurantMenuIcon,
      color: '#22535d',
    },
    {
      title: t("diaper"),
      actionType: 3,
      Icon: BabyChangingStationIcon,
      color: '#22535d',
    },
  ];
};

export { ACTIONS };
