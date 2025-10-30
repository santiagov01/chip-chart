import { useState, useMemo } from "react";
import { CategorySidebar } from "@/components/CategorySidebar";
import { ElectronicsCalculator } from "@/components/ElectronicsCalculator";
import { ComponentCard } from "@/components/ComponentCard";
import { ComponentDetail } from "@/components/ComponentDetail";
import { AddComponentDialog } from "@/components/AddComponentDialog";
import { sampleCategories } from "@/data/sampleData";
import { Component, Category } from "@/types/component";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";

const Index = () => {
  const [categories, setCategories] = useState<Category[]>(sampleCategories);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);

  const currentSubcategory = useMemo(() => {
    if (!selectedSubcategory) return null;
    for (const category of categories) {
      const subcategory = category.subcategories.find((s) => s.id === selectedSubcategory);
      if (subcategory) return subcategory;
    }
    return null;
  }, [categories, selectedSubcategory]);

  const filteredComponents = useMemo(() => {
    if (!currentSubcategory) return [];
    if (!searchQuery) return currentSubcategory.components;

    const query = searchQuery.toLowerCase();
    return currentSubcategory.components.filter(
      (component) =>
        component.name.toLowerCase().includes(query) ||
        component.description.toLowerCase().includes(query) ||
        component.specifications.some(
          (spec) =>
            spec.key.toLowerCase().includes(query) || spec.value.toLowerCase().includes(query)
        )
    );
  }, [currentSubcategory, searchQuery]);

  const handleComponentClick = (component: Component) => {
    setSelectedComponent(component);
    setIsDetailOpen(true);
  };

  const handleAddComponent = (newComponent: Omit<Component, "id">) => {
    const component: Component = {
      ...newComponent,
      id: `comp-${Date.now()}`,
    };

    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        subcategories: category.subcategories.map((subcategory) =>
          subcategory.id === component.subcategoryId
            ? {
                ...subcategory,
                components: [...subcategory.components, component],
              }
            : subcategory
        ),
      }))
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <CategorySidebar
        categories={categories}
        selectedSubcategory={selectedSubcategory}
        onSubcategorySelect={(id) => {
          setSelectedSubcategory(id);
          setShowCalculator(false);
        }}
        onCalculatorSelect={() => {
          setShowCalculator(true);
          setSelectedSubcategory(null);
        }}
        isCalculatorSelected={showCalculator}
      />

      <div className="flex-1 flex flex-col">
        <header className="border-b border-border bg-card sticky top-0 z-10 shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {selectedSubcategory && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Component
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {showCalculator ? (
            <ElectronicsCalculator />
          ) : !selectedSubcategory ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 max-w-md">
                <div className="text-6xl">⚡</div>
                <h2 className="text-2xl font-bold">Welcome to Electronics Components Library</h2>
                <p className="text-muted-foreground">
                  Select a category from the sidebar to browse components, or use the search bar to
                  find specific parts.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold">{currentSubcategory?.name}</h2>
                <p className="text-muted-foreground mt-2">
                  {filteredComponents.length} component{filteredComponents.length !== 1 ? "s" : ""}{" "}
                  {searchQuery && "matching your search"}
                </p>
              </div>

              {filteredComponents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "No components match your search"
                      : "No components in this category yet"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredComponents.map((component) => (
                    <ComponentCard
                      key={component.id}
                      component={component}
                      onClick={() => handleComponentClick(component)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <ComponentDetail
        component={selectedComponent}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      {selectedSubcategory && (
        <AddComponentDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          subcategoryId={selectedSubcategory}
          onAdd={handleAddComponent}
        />
      )}
    </div>
  );
};

export default Index;
