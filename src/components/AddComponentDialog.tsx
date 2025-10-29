import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Component, ComponentSpec } from "@/types/component";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddComponentDialogProps {
  open: boolean;
  onClose: () => void;
  subcategoryId: string;
  onAdd: (component: Omit<Component, "id">) => void;
}

export const AddComponentDialog = ({
  open,
  onClose,
  subcategoryId,
  onAdd,
}: AddComponentDialogProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [datasheetUrl, setDatasheetUrl] = useState("");
  const [specifications, setSpecifications] = useState<ComponentSpec[]>([
    { key: "", value: "" },
  ]);

  const handleAddSpec = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) {
      toast({
        title: "Error",
        description: "Name and description are required",
        variant: "destructive",
      });
      return;
    }

    const validSpecs = specifications.filter((spec) => spec.key && spec.value);

    onAdd({
      name,
      description,
      datasheetUrl: datasheetUrl || undefined,
      specifications: validSpecs,
      subcategoryId,
    });

    // Reset form
    setName("");
    setDescription("");
    setDatasheetUrl("");
    setSpecifications([{ key: "", value: "" }]);
    onClose();

    toast({
      title: "Success",
      description: "Component added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Component</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new component to the library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Component Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., LM358 Dual Op-Amp"
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the component..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="datasheet">Datasheet URL (Optional)</Label>
            <Input
              id="datasheet"
              value={datasheetUrl}
              onChange={(e) => setDatasheetUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Specifications</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddSpec}>
                <Plus className="h-4 w-4 mr-1" />
                Add Spec
              </Button>
            </div>

            <div className="space-y-2">
              {specifications.map((spec, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Parameter name"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                  />
                  <Input
                    placeholder="Value"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSpec(index)}
                    disabled={specifications.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Component</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
