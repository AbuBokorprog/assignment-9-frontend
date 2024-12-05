import {
  Button,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useGetAllUsersQuery } from '../../../redux/features/api/users/user.api';

const AdminAllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const { data, isLoading } = useGetAllUsersQuery({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUserHandler = (id: string) => {};
  const blockUserHandler = (id: string) => {};
  const suspendUserHandler = (id: string) => {};
  const promoteUserHandler = (id: string) => {};

  const columns = [
    { id: 'id', label: 'User Id', align: 'center' },
    { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
    {
      id: 'phone',
      label: 'Phone',
      minWidth: 170,
      align: 'center',
      format: (value) => (
        <>
          <p>{value ? value : 'No Phone'}</p>
        </>
      ),
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'center',
      format: (value) => (
        <>
          <p>{value ? value : 'No Email'}</p>
        </>
      ),
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 100,
      align: 'center',
      format: (row) => (
        <div className="space-x-4">
          <Button
            variant="contained"
            color="warning"
            onClick={() => blockUserHandler(row.id)}
          >
            Block
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => suspendUserHandler(row.id)}
          >
            Suspend
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => promoteUserHandler(row.id)}
          >
            Promote
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">All Users</h2>
          </div>
          <div>
            <TextField
              size="small"
              placeholder="Search shops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              className="w-64"
            />
          </div>
        </div>

        <div>
          <Paper sx={{ width: '100%', overflow: 'hidden' }} className="my-10">
            <TableContainer sx={{ maxHeight: 700 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.data
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row: any) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align="center">
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : column.id === 'phone'
                                  ? column.format(row.phone)
                                  : column.id === 'action'
                                  ? column.format(row)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[25, 100]}
              component="div"
              count={data?.data?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default AdminAllUsers;
