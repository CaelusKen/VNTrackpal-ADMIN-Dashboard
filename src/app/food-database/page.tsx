import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./components/food-table/columns";
import { foods } from "./components/food-table/data";

export default function FoodDataPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-4">
        Vietnamese Food Data
      </h1>
      <DataTable
        columns={columns}
        data={foods}
        searchableColumns={[
          {
            id: "name",
            title: "dish name",
          },
        ]}
        filterableColumns={[
          {
            id: "type",
            title: "Type",
            options: [
              { label: "Dry", value: "Dry" },
              { label: "Soupy", value: "Soupy" },
            ],
          },
          {
            id: "region",
            title: "Region",
            options: [
              { label: "North", value: "North" },
              { label: "Central", value: "Central" },
              { label: "South", value: "South" },
            ],
          },
        ]}
      />
    </div>
  );
}
