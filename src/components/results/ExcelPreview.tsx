import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Check, X } from "lucide-react";

interface CellData {
  value: string;
  confidence: "high" | "medium" | "low";
}

interface ExcelPreviewProps {
  data: CellData[][];
  headers: string[];
}

export function ExcelPreview({ data, headers }: ExcelPreviewProps) {
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [tableData, setTableData] = useState(data);

  const startEditing = (row: number, col: number, value: string) => {
    setEditingCell({ row, col });
    setEditValue(value);
  };

  const saveEdit = () => {
    if (editingCell) {
      const newData = [...tableData];
      newData[editingCell.row][editingCell.col] = {
        ...newData[editingCell.row][editingCell.col],
        value: editValue,
      };
      setTableData(newData);
      setEditingCell(null);
    }
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const getConfidenceStyles = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "bg-card";
      case "medium":
        return "bg-warning/8 border-l-2 border-l-warning/60";
      case "low":
        return "bg-destructive/8 border-l-2 border-l-destructive/60";
      default:
        return "bg-card";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-soft"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/60">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3.5 text-left text-sm font-medium text-foreground border-b border-border/60"
                >
                  {header}
                </th>
              ))}
              <th className="px-4 py-3.5 text-left text-sm font-medium text-foreground border-b border-border/60 w-14">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: rowIndex * 0.04, duration: 0.3, ease: "easeOut" }}
                className="hover:bg-accent/20 transition-colors duration-150"
              >
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 text-sm border-b border-border/40 ${getConfidenceStyles(
                      cell.confidence
                    )}`}
                  >
                    {editingCell?.row === rowIndex && editingCell?.col === colIndex ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1 px-2.5 py-1.5 bg-background border border-primary/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-150"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") cancelEdit();
                          }}
                        />
                        <button
                          onClick={saveEdit}
                          className="p-1.5 text-success hover:bg-success/10 rounded-lg transition-colors duration-150"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors duration-150"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-foreground">{cell.value}</span>
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 border-b border-border/40">
                  <button
                    onClick={() => startEditing(rowIndex, 0, row[0].value)}
                    className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent/60 rounded-lg transition-all duration-150"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
