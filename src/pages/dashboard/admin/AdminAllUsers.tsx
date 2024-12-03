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
import { Link } from 'react-router-dom';

const AdminAllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

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
          <Link to={`/admin/user-details/${row?.id}`}>
            <Button variant="contained" color="primary">
              View
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteUserHandler(row.id)}
          >
            Delete
          </Button>
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

  const fakeUserData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michaelbrown@example.com',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emilydavis@example.com',
    },
    {
      id: 5,
      name: 'Chris Wilson',
      email: null, // To test the "No Email" fallback
    },
    {
      id: 6,
      name: 'Sarah Taylor',
      email: 'sarahtaylor@example.com',
    },
    {
      id: 7,
      name: 'David Martinez',
      email: 'davidmartinez@example.com',
    },
    {
      id: 8,
      name: 'Sophia Anderson',
      email: 'sophiaanderson@example.com',
    },
    {
      id: 9,
      name: 'Daniel Lee',
      email: 'daniellee@example.com',
    },
    {
      id: 10,
      name: 'Laura Thompson',
      email: null, // To test the "No Email" fallback
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
                  {fakeUserData
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
              count={fakeUserData.length}
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
