import { Tabs as MuiTabs, Tab as MuiTab } from '@mui/material';

const Tab = ({ tabs = [], value, onChange, ...props }) => (
  <MuiTabs value={value} onChange={onChange} {...props}>
    {tabs.map((tab, index) => (
      <MuiTab key={index} label={tab.label} {...tab.props} />
    ))}
  </MuiTabs>
);

export default Tab;
