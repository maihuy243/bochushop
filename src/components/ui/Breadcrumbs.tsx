import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight size={16} className="mx-2 text-gray-400" />
            )}
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className={`hover:text-blue-600 transition-colors ${
                  item.active ? 'text-blue-600 font-medium' : ''
                }`}
              >
                {item.label}
              </button>
            ) : (
              <span className={item.active ? 'text-blue-600 font-medium' : ''}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}