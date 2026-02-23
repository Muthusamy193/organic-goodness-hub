import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SectionContent } from "@/context/ContentContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  section: SectionContent | null;
  onSave: (id: string, fields: SectionContent["fields"]) => void;
}

const ContentEditModal = ({ isOpen, onClose, section, onSave }: Props) => {
  const [fields, setFields] = useState<SectionContent["fields"]>([]);

  useEffect(() => {
    if (section) setFields(section.fields.map((f) => ({ ...f })));
  }, [section, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (section) {
      onSave(section.id, fields);
      onClose();
    }
  };

  const updateField = (key: string, value: string) => {
    setFields((prev) => prev.map((f) => (f.key === key ? { ...f, value } : f)));
  };

  if (!section) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">Edit {section.label}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label>{field.label}</Label>
              <Input
                value={field.value}
                onChange={(e) => updateField(field.key, e.target.value)}
              />
            </div>
          ))}
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="hero">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContentEditModal;
