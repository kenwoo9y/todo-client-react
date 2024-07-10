import React from "react";
import { Pencil, Trash } from "lucide-react";

interface Column {
    label: string,
    field: string
}

interface DataTableProps {
    columns: Column[];
    data: any[];
}

const TaskList: React.FC<DataTableProps> = ({ columns, data }) => {
    return (
        <div className="overflow-x-auto">
            <h1 className="text-2xl">ToDo</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th 
                                key={column.field} 
                                className="py-3 px-6 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100">
                            {columns.map((column) => (
                                <td 
                                    key={column.field} 
                                    className="py-3 px-6 border-b border-gray-200 text-sm text-gray-700"
                                >
                                    {column.field === 'index' ? rowIndex + 1 : 
                                    column.field === 'actions' ? (
                                        <div className="flex space-x-4">
                                          <Pencil className="text-black cursor-pointer" />
                                          <Trash className="text-black cursor-pointer" />
                                        </div>
                                    ) : row[column.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;