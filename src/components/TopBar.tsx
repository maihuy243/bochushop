import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function TopBar() {
  return (
    <div className="bg-gray-100 border-b">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-end gap-4 py-2 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Country/Region:</span>
            <Select defaultValue="US">
              <SelectTrigger className="w-auto h-auto border-0 p-1 bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
                <SelectItem value="UK">United Kingdom</SelectItem>
                <SelectItem value="DE">Germany</SelectItem>
                <SelectItem value="FR">France</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Currency:</span>
            <Select defaultValue="USD">
              <SelectTrigger className="w-auto h-auto border-0 p-1 bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD $</SelectItem>
                <SelectItem value="EUR">EUR €</SelectItem>
                <SelectItem value="GBP">GBP £</SelectItem>
                <SelectItem value="CAD">CAD $</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-gray-600">Language:</span>
            <Select defaultValue="EN">
              <SelectTrigger className="w-auto h-auto border-0 p-1 bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EN">English</SelectItem>
                <SelectItem value="ES">Español</SelectItem>
                <SelectItem value="FR">Français</SelectItem>
                <SelectItem value="DE">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}