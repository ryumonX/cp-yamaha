import DataTable, { TableColumn } from 'react-data-table-component';

export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  imageFile?: File;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductTableProps {
  data: ProductData[];
  onEdit: (product: ProductData) => void;
  onDelete: (id: number) => void;
}

const ProductTable = ({ data, onEdit, onDelete }: ProductTableProps) => {
  const columns: TableColumn<ProductData>[] = [
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
            alt={row.name}
            className="h-16 w-24 object-cover rounded"
          />
        ) : (
          <span className="text-gray-400 italic">No image</span>
        )
      ),
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => `$${row.price.toFixed(2)}`,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: ProductData) => (
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

export default ProductTable;
