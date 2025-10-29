import { Component } from "@/types/component";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText } from "lucide-react";

interface ComponentCardProps {
  component: Component;
  onClick: () => void;
}

export const ComponentCard = ({ component, onClick }: ComponentCardProps) => {
  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-card-hover animate-fade-in group"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {component.name}
            </CardTitle>
            <CardDescription className="mt-2">{component.description}</CardDescription>
          </div>
          {component.datasheetUrl && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                window.open(component.datasheetUrl, "_blank");
              }}
              className="shrink-0"
            >
              <FileText className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {component.specifications.slice(0, 3).map((spec, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                <span className="font-medium">{spec.key}:</span>
                <span className="ml-1">{spec.value}</span>
              </Badge>
            ))}
            {component.specifications.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{component.specifications.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
