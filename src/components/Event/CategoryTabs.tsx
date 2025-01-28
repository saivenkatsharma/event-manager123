import { Tabs, Tab, Box } from '@mui/material';

const categories = [
  'Music',
  'Sports',
  'Arts & Theatre',
  'Film',
  'Miscellaneous'
];

interface CategoryTabsProps {
  category: string;
  setCategory: (category: string) => void;
}

export const CategoryTabs = ({ category, setCategory }: CategoryTabsProps) => (
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs
      value={category.toLowerCase()}
      onChange={(_, newValue) => setCategory(newValue)}
      variant="scrollable"
      scrollButtons="auto"
    >
      {categories.map((cat) => (
        <Tab
          key={cat}
          label={cat}
          value={cat.toLowerCase()}
          sx={{ textTransform: 'none' }}
        />
      ))}
    </Tabs>
  </Box>
);