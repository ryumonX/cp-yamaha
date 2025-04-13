import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import DataTable, { TableColumn } from 'react-data-table-component';

export interface UserData {
  id: number;
  username: string;
  name: string;
  password?: string;
}

interface UserTableProps {
  data: UserData[];
  onEdit: (user: UserData) => void;
  onDelete: (id: number) => void;
}

const UserTable = ({ data, onEdit, onDelete }: UserTableProps) => {
  const columns: TableColumn<UserData>[] = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '80px',
    },
    {
      name: 'Username',
      selector: row => row.username,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: UserData) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <PencilSquareIcon className="h-5 w-5 text-blue-500" />

          </button>
          <button
            onClick={() => onDelete(row.id)}
            className="text-red-500 hover:text-red-700"
          >
            <TrashIcon className="h-5 w-5 text-blue-500" />
            
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      responsive
      striped
      highlightOnHover
      customStyles={{
        headCells: {
          style: {
            backgroundColor: '#f8fafc',
            fontWeight: 'bold',
            fontSize: '14px',
          },
        },
        cells: {
          style: {
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
          },
        },
      }}
    />
  );
};

export default UserTable;
