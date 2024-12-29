import { Skeleton } from '@mui/material';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BreadCrumbsSkeleton = () => {
  return (
    <Stack spacing={2}>
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
        <Skeleton variant="text" width={50} height={20} />
        <Skeleton variant="text" width={70} height={20} />
      </Breadcrumbs>
    </Stack>
  );
};

export default BreadCrumbsSkeleton;
