import { Component } from "@/types/component";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ComponentDetailProps {
  component: Component | null;
  open: boolean;
  onClose: () => void;
}

export const ComponentDetail = ({ component, open, onClose }: ComponentDetailProps) => {
  if (!component) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{component.name}</DialogTitle>
          <DialogDescription>{component.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {component.image && (
            <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
              <img
                src={component.image}
                alt={component.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}

          <div>
            <h3 className="font-semibold text-lg mb-3">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {component.specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <span className="font-medium text-sm text-muted-foreground">{spec.key}</span>
                  <Badge variant="secondary">{spec.value}</Badge>
                </div>
              ))}
            </div>
          </div>

          {component.datasheetUrl && (
            <div>
              <Button
                className="w-full"
                onClick={() => window.open(component.datasheetUrl, "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Datasheet
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
