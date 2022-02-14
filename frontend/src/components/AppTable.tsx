import { ChangeEvent, ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import type { BaseDTO } from '@src/types/models';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Close as CloseIcon } from '@mui/icons-material';

type Order = 'asc' | 'desc';

type ColumnId<DTO extends BaseDTO, ID extends keyof DTO | '' = ''> = keyof Omit<DTO, ID>;

export interface Column<DTO extends BaseDTO, IDNotColumn extends keyof DTO | '' = ''> {
  id: ColumnId<DTO, IDNotColumn>;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  orderOn?: boolean;
  searchOn?: boolean;
  format?: (value: DTO[ColumnId<DTO, IDNotColumn>], row: DTO) => string;
  component?: (row: DTO) => ReactNode | null;
  color?: (row: DTO) => string | undefined;
}

interface AppTableProps<DTO extends BaseDTO, IDNotColumn extends keyof DTO | '' = ''> {
  dataList: DTO[];
  columns: Column<DTO, IDNotColumn>[];
  orderByStart: keyof DTO;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<DTO extends BaseDTO>(order: Order, orderBy: keyof DTO): (a: DTO, b: DTO) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function AppTable<DTO extends BaseDTO, IDNotColumn extends keyof DTO | '' = ''>({
  dataList,
  columns,
  orderByStart,
}: AppTableProps<DTO, IDNotColumn>): ReactElement | null {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState(orderByStart);

  const countRows = dataList.length;
  const countPage = useMemo(() => Math.ceil(countRows / rowsPerPage), [countRows, rowsPerPage]);
  const notFoundPage = countPage <= page;

  useEffect(() => {
    if (notFoundPage && page > 1) {
      setPage(countPage - 1);
    }
  }, [notFoundPage, setPage, countPage, page]);

  const searchFields = useMemo(() => columns.filter((item) => item?.searchOn), [columns]);
  const searchList = useMemo(() => {
    if (searchFields.length === 0 || search.length < 2) return dataList;
    return dataList.filter((item) => {
      let rezult = false;
      const regexp = new RegExp(search.trim(), 'i');
      searchFields.forEach((field) => {
        rezult = regexp.test(String(item[field.id])) || rezult;
      });
      return rezult;
    });
  }, [searchFields, search, dataList]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property: ColumnId<DTO, IDNotColumn>) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {searchFields.length > 0 && (
        <TextField
          value={search}
          onChange={(ev: ChangeEvent<HTMLInputElement>) => setSearch(ev.target.value)}
          label="Поиск"
          sx={{ m: 2, minWidth: 300 }}
          InputProps={{
            endAdornment: search.length > 0 && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearch('')}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {column.orderOn ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    <>{column.label}</>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {searchList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(getComparator<DTO>(order, orderBy))
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={String(column.id)}
                          align={column.align}
                          sx={{ color: column.color && column.color(row) }}
                        >
                          {column.component
                            ? column.component(row)
                            : column.format
                            ? column.format(value, row)
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
      {!notFoundPage && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
