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
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import {
  useGetAllUsersQuery,
  useUserStatusChangeMutation,
} from '../../../redux/features/api/users/user.api';
import { userStatus } from '../../../types/user.type';
import { toast } from 'sonner';
import Loader from '../../../components/ui/Loader';
import { useAppSelector } from '../../../redux/hooks/hooks';
import { currentUser } from '../../../redux/store';
import UserMenu from '../../../components/ui/dashboard/UserMenu';
import Title from '../../../components/helmet/Title';

const AdminAllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const user = useAppSelector(currentUser);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data, isLoading: isUserLoading } = useGetAllUsersQuery({});

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [userStatusChange, { isLoading }] = useUserStatusChangeMutation();

  const deleteUserHandler = async (id: string, status: string) => {
    const toastId = toast.loading('Loading...');
    const data = { id, status };

    try {
      const res = await userStatusChange(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 200 });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const userActiveHandler = async (id: string, status: string) => {
    const toastId = toast.loading('Loading...');
    const data = { id, status };

    try {
      const res = await userStatusChange(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 200 });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // column
  const columns: any = [
    { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
    {
      id: 'phone',
      label: 'Phone',
      minWidth: 170,
      align: 'center',
      format: (value: string) => (
        <>
          <p>{value ? value : 'No Phone'}</p>
        </>
      ),
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 100,
      align: 'center',
      format: (value: string) => (
        <>
          <p>{value ? value : 'No Email'}</p>
        </>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      align: 'center',
    },
    {
      id: 'role',
      label: 'Role',
      align: 'center',
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 100,
      align: 'center',
      format: (row: any) => (
        <>
          {user?.email !== row?.email && row?.status === userStatus.ACTIVE ? (
            <div className="space-x-4">
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteUserHandler(row.id, userStatus.DELETED)}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => userActiveHandler(row.id, userStatus.BLOCKED)}
              >
                Block
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => userActiveHandler(row.id, userStatus.SUSPEND)}
              >
                Suspend
              </Button>
            </div>
          ) : row?.status === userStatus.BLOCKED ? (
            <div className="space-x-4">
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteUserHandler(row.id, userStatus.DELETED)}
              >
                Delete
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => userActiveHandler(row.id, userStatus.SUSPEND)}
              >
                Suspend
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => userActiveHandler(row.id, userStatus.ACTIVE)}
              >
                Active
              </Button>
            </div>
          ) : row?.any === userStatus?.DELETED ? (
            <div className="space-x-4">
              <Button
                variant="contained"
                color="warning"
                onClick={() => userActiveHandler(row.id, userStatus.BLOCKED)}
              >
                Block
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => userActiveHandler(row.id, userStatus.SUSPEND)}
              >
                Suspend
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => userActiveHandler(row.id, userStatus.ACTIVE)}
              >
                Active
              </Button>
            </div>
          ) : (
            row?.status === userStatus?.SUSPEND && (
              <div className="space-x-4">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteUserHandler(row.id, userStatus.DELETED)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => userActiveHandler(row.id, userStatus.BLOCKED)}
                >
                  Block
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  onClick={() => userActiveHandler(row.id, userStatus.ACTIVE)}
                >
                  Active
                </Button>
              </div>
            )
          )}
        </>
      ),
    },
  ];

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <Title title="All Users" content="This is all users page." />
      {isLoading || (isUserLoading && <Loader />)}
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
            <TableContainer sx={{ maxHeight: 1000 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column: any) => (
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
                          className="relative"
                        >
                          {columns.map((column: any) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align="center">
                                {column.id === 'phone'
                                  ? column.format(row.phone)
                                  : column.id === 'action'
                                  ? column.format(row)
                                  : value}

                                <div className="absolute right-0 z-50 top-4">
                                  <UserMenu userId={row?.id} />
                                </div>
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
