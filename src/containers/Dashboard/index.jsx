import { Button } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import React, { useState } from 'react';
import Table from '@src/components/Table';

const columns = [
  {
    field: 'name', // required
    title: 'Name',
    sortable: false,
    align: 'left',
    render: (rowData) => <Button>{rowData.name}</Button>,
  },
  {
    field: 'birthYear',
    title: 'Birth Year',
    sortable: true,
    align: 'center',
  },
  {
    field: 'birthCity',
    title: 'Birth City',
    sortable: false,
    align: 'right',
  },
];

const data = [
  {
    id: 1, // required
    name: 'MinhPQ',
    birthYear: 1995,
    birthCity: 'Bac Ninh',
  },
  {
    id: 2,
    name: 'HuyenPK',
    birthYear: 1997,
    birthCity: 'Hoa Binh',
  },
  {
    id: 3,
    name: 'HuongTTT',
    birthYear: 1998,
    birthCity: 'Nam DInh',
  },
  {
    id: 4,
    name: 'TuanLB',
    birthYear: 1999,
    birthCity: 'Ha Noi',
  },
  {
    id: 5,
    name: 'ThanhNX',
    birthYear: 1999,
    birthCity: 'Bac Ninh',
  },
  {
    id: 6,
    name: 'MungNT',
    birthYear: 1998,
    birthCity: 'Bac Ninh',
  },
];

const Dashboard = () => {
  const { keycloak } = useKeycloak();

  const [page, setPage] = useState(1);

  const handleChangePage = (newPage) => setPage(newPage);

  return (
    <div>
      {keycloak.authenticated && (
        <Button onClick={() => keycloak.logout()} variant="outlined">
          Logout
        </Button>
      )}
      <Table
        columns={columns}
        data={data}
        total={data.length}
        page={page}
        selection
        showNumber
        onChangePage={handleChangePage}
      />
    </div>
  );
};

export default Dashboard;
