import DataTable, { TableColumn } from 'react-data-table-component';

export interface ArticleData {
  id: number;
  title: string;
  content: string;
  thumbnail?: string; // <- sudah boleh undefined
  publishedAt: string;
  authorId: number;
}

interface ArticleTableProps {
  data: ArticleData[];
  onEdit: (article: ArticleData) => void;
  onDelete: (id: number) => void;
}

const ArticleTable = ({ data, onEdit, onDelete }: ArticleTableProps) => {
  const columns: TableColumn<ArticleData>[] = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '80px',
    },
    {
      name: 'Thumbnail',
      cell: row => (
        row.thumbnail ? (
          <img
            src={`http://localhost:4000${row.thumbnail}`}
            alt={`Article ${row.id}`}
            className="h-16 w-24 object-cover rounded"
          />
        ) : (
          <span className="text-gray-400 italic">No thumbnail</span>
        )
      ),
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Content',
      selector: row => row.content.slice(0, 50) + '...',
      sortable: false,
    },
    {
      name: 'Published At',
      selector: row => new Date(row.publishedAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: ArticleData) => (
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

export default ArticleTable;
