import { useState } from "react";
import { ChevronDown, ChevronRight, Cpu, Zap, Microchip, Radar, Cable, Battery, Plug, Calculator } from "lucide-react";
import { Category, Subcategory } from "@/types/component";
import { cn } from "@/lib/utils";

interface CategorySidebarProps {
  categories: Category[];
  selectedSubcategory: string | null;
  onSubcategorySelect: (subcategoryId: string) => void;
  onCalculatorSelect: () => void;
  isCalculatorSelected: boolean;
}

const iconMap: Record<string, any> = {
  Cpu,
  Zap,
  Microchip,
  Radar,
  Cable,
  Battery,
  Plug,
};

export const CategorySidebar = ({
  categories,
  selectedSubcategory,
  onSubcategorySelect,
  onCalculatorSelect,
  isCalculatorSelected,
}: CategorySidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map((c) => c.id))
  );

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="w-72 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-sidebar-foreground flex items-center gap-2">
          <Cpu className="h-7 w-7 text-sidebar-primary" />
          Components Library
        </h1>
      </div>

      <div className="p-4 space-y-2">
        <button
          onClick={onCalculatorSelect}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
            isCalculatorSelected
              ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
        >
          <Calculator className="h-5 w-5 text-sidebar-primary" />
          <span className="font-medium text-sm">Electronics Calculator</span>
        </button>

        <div className="border-t border-sidebar-border my-4" />

        {categories.map((category) => {
          const Icon = iconMap[category.icon] || Cpu;
          const isExpanded = expandedCategories.has(category.id);

          return (
            <div key={category.id} className="space-y-1">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-sidebar-primary" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <Icon className="h-5 w-5 text-sidebar-primary" />
                <span className="font-medium text-sm">{category.name}</span>
              </button>

              {isExpanded && (
                <div className="ml-6 space-y-1 animate-fade-in">
                  {category.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => onSubcategorySelect(subcategory.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedSubcategory === subcategory.id
                          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      {subcategory.name}
                      <span className="ml-2 text-xs opacity-60">
                        ({subcategory.components.length})
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
