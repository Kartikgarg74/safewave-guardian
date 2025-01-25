import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const SOSButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const { toast } = useToast();

  const handleSOSClick = () => {
    setIsPressed(true);
    toast({
      title: "Emergency Alert Activated",
      description: "Help is on the way. Stay calm and find a safe location.",
      variant: "destructive",
    });

    // Reset button state after 2 seconds
    setTimeout(() => setIsPressed(false), 2000);
  };

  return (
    <Button
      variant="destructive"
      size="lg"
      className={`w-32 h-32 rounded-full text-xl font-bold shadow-lg transition-all duration-300 animate-pulse-slow
        ${isPressed ? "bg-red-700 scale-95" : "bg-secondary hover:bg-red-600"}`}
      onClick={handleSOSClick}
    >
      SOS
    </Button>
  );
};