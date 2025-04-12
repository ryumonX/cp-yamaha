import DataTable, { TableColumn } from 'react-data-table-component';

export interface galleryData {
  id: number;
  title:string;
  imageUrl: string;
}

interface galleryTableProps {
  data: galleryData[];
  onEdit: (gallery: galleryData) => void;
  onDelete: (id: number) => void;
}

const GalleryTable = ({ data, onEdit, onDelete }: galleryTableProps) => {
  const columns: TableColumn<galleryData>[] = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '80px',
    },
    {
      name: 'Image',
      cell: row => (
        <img
          src={`http://localhost:4000${row.imageUrl}`}
          alt={`Gallery ${row.id}`}
          className="h-16 w-24 object-cover rounded"
        />
      ),
    },
    {
      name: 'Actions',
      cell: (row: galleryData) => (
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

export default GalleryTable;
