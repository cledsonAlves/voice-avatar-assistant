import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

interface AvatarSelectionProps {
  selectedAssistant: string;
  onSelect: (assistantId: string) => void;
}

const assistants = [
  {
    id: "9sFroVSgPhgpGak8Jygu",
    name: "Iara",
    color: "from-blue-500 to-purple-500"
  },
  {
    id: "another_assistant_id_1", // Replace with actual assistant ID
    name: "Iago",
    color: "from-green-500 to-teal-500"
  },
  {
    id: "another_assistant_id_2", // Replace with actual assistant ID
    name: "Cledson Virtual",
    color: "from-orange-500 to-red-500"
  }
];

export const AvatarSelection: React.FC<AvatarSelectionProps> = ({
  selectedAssistant,
  onSelect
}) => {
  return (
    <RadioGroup
      value={selectedAssistant}
      onValueChange={onSelect}
      className="flex gap-4 mb-6"
    >
      {assistants.map((assistant) => (
        <div key={assistant.id} className="flex flex-col items-center gap-2">
          <RadioGroupItem
            value={assistant.id}
            id={assistant.id}
            className="peer sr-only"
          />
          <Label
            htmlFor={assistant.id}
            className="flex flex-col items-center cursor-pointer"
          >
            <div
              className={cn(
                "w-20 h-20 rounded-full bg-gradient-to-r transition-transform peer-checked:scale-110",
                assistant.color
              )}
            />
            <span className="mt-2 font-medium">{assistant.name}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};