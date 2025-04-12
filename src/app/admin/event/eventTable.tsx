import DataTable, { TableColumn } from 'react-data-table-component';

export interface EventData {
  id: number;
  title: string;
  description: string;
  location: string;
  date: Date;
  image: string | File; // support both uploaded File or URL
}

interface EventTableProps {
  data: EventData[];
  onEdit: (event: EventData) => void;
  onDelete: (id: number) => void;
}

const EventTable = ({ data, onEdit, onDelete }: EventTableProps) => {
  const columns: TableColumn<EventData>[] = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '80px',
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
      selector: row => row.date.toLocaleString(), // full date-time
      sortable: true,
    },
    {
      name: 'Image',
      cell: row => {
        const imageUrl =
          typeof row.image === 'string'
            ? row.image
            : URL.createObjectURL(row.image); // preview for File

        return (
          <img
            src={imageUrl}
            alt={`Event ${row.id}`}
            className="h-16 w-24 object-cover rounded"
          />
        );
      },
    },
    {
      name: 'Actions',
      cell: (row: EventData) => (
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
