import { Button } from "@/components/ui/button"

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      onClick={onClick}
      className="mr-2 mb-2"
    >
      {label}
    </Button>
  )
}

