import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import DataTable, { TableColumn } from 'react-data-table-component';

export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  imageFile?: File;
  links?: { id: number; url: string; productId: number }[];
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
      name: 'Links',
      cell: row => (
        row.links && row.links.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {row.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm hover:bg-blue-200 transition-colors"
              >
                Link {index + 1}
              </a>
            ))}
          </div>
        ) : (
          <span className="text-gray-400 italic">No link</span>
        )
      ),
    },
    {
      name: 'Actions',
      cell: (row: ProductData) => (
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
            <TrashIcon className="h-5 w-5 text-red-500" />

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
