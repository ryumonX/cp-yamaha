import DataTable, { TableColumn } from 'react-data-table-component';

export interface eventData {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  image?: string;
}

interface eventTableProps {
  data: eventData[];
  onEdit: (event: eventData) => void;
  onDelete: (id: number) => void;
}

const EventTable = ({ data, onEdit, onDelete }: eventTableProps) => {
  const columns: TableColumn<eventData>[] = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '80px',
    },
    {
      name: 'Image',
      cell: row => (
        row.image ? (
          <img
            src={`http://localhost:4000${row.image}`}
            alt={`Event ${row.id}`}
            className="h-16 w-24 object-cover rounded"
          />
        ) : (
          <span className="text-gray-400 italic">No image</span>
        )
      ),
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Location',
      selector: row => row.location,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: eventData) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(row.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
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

export default EventTable;
