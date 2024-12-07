import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import { TCategory } from '../../../types/categories.type';
import { FaEdit, FaEllipsisV, FaTrash } from 'react-icons/fa';

type CategoriesCardProps = {
  data: TCategory;
};

const CategoriesCard: React.FC<CategoriesCardProps> = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProduct = () => {};
  const handleDeleteClick = () => {};

  return (
    <div className="">
      <Card className="relative">
        <CardMedia
          sx={{ height: 250 }}
          image={data?.image}
          title={data?.name}
        />
        <div className="absolute top-0 right-0">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <FaEllipsisV />
          </IconButton>
        </div>
        <div className="absolute top-1 left-1">
          <Chip
            label={data?.isActive}
            color={data?.isActive === 'APPROVED' ? 'primary' : 'error'}
          />
        </div>
        <CardContent>
          <Typography variant="h6" component={'h6'}>
            {data?.name}
          </Typography>
          <Typography variant="body1" component={'p'}>
            {data?.description}
          </Typography>
        </CardContent>
      </Card>

      <div>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: 100,
                width: '20ch',
              },
            },
          }}
        >
          <MenuItem onClick={handleEditProduct}>
            <FaEdit className="mr-2" /> Edit Category
          </MenuItem>

          <MenuItem onClick={handleDeleteClick} className="text-red-500">
            <FaTrash className="mr-2" /> Delete Category
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default CategoriesCard;
