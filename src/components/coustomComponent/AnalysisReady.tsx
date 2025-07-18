import { useState, useEffect } from "react";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingSpinner from "./LoadingSpinner";

type WeeklyProduct = {
  week_start: string;
  product_item: string;
};

const TrainingSuccess = ({
  result,
  onChange,
  loading,
}: {
  result: { products: string[] };
  onChange: (value: WeeklyProduct) => void;
  loading: boolean;
}) => {
  const initialDate = new Date("2023-05-29");
  const initialProduct = "73430: KL 3 8X50 AIR HOSE REEL W LEAD";

  const [date, setDate] = useState<Date>(initialDate);
  const [selectedProduct, setSelectedProduct] =
    useState<string>(initialProduct);

  useEffect(() => {
    onChange({
      week_start: format(date, "yyyy-MM-dd"),
      product_item: selectedProduct,
    });
  }, []);

  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) return;
    setDate(newDate);
    onChange({
      week_start: format(newDate, "yyyy-MM-dd"),
      product_item: selectedProduct,
    });
  };

  const handleProductChange = (item: string) => {
    setSelectedProduct(item);
    onChange({
      week_start: format(date, "yyyy-MM-dd"),
      product_item: item,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-green-200 rounded-xl shadow-lg p-6 text-center">
      <div className="flex flex-col items-center space-y-3">
        <CheckCircle className="w-12 h-12 text-green-500" />
        <h2 className="text-2xl font-bold text-green-700">
          Model Training Complete!
        </h2>
      </div>

      <p className="mt-4 text-base text-gray-600">
        Your forecasting model is ready for analysis.
      </p>

      {loading ? (
        <>
          <div>
            <LoadingSpinner message="Predicting..." />
          </div>
        </>
      ) : (
        <div className="mt-6 flex flex-col items-center space-y-4">
          <div className="flex flex-col">
            <p className="self-start text-[13px] text-gray-700 font-extralight">
              Select Date
            </p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col">
            <p className="self-start text-[13px] text-gray-700 font-extralight">
              Select Product
            </p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[240px] bg-transparent">
                  {`${selectedProduct.slice(0, 30)}...` || "Select Product"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Available Products</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {result?.products.map((item: string) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => handleProductChange(item)}
                    title={item}
                  >
                    <p className="w-max">{`${item}...`}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingSuccess;
