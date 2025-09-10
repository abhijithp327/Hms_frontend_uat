import React, { useRef, useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SignatureModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (signature: string) => void;
}

const SignatureModal: React.FC<SignatureModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const sigRef = useRef<SignatureCanvas>(null);
  const [canvasWidth, setCanvasWidth] = useState(400);
  const [canvasHeight, setCanvasHeight] = useState(200);

  // Resize canvas based on screen size
  useEffect(() => {
    const updateCanvasDimensions = () => {
      const screenWidth = window.innerWidth;
      
      if (screenWidth < 640) {
        // Mobile
        setCanvasWidth(Math.min(screenWidth - 80, 300)); // More padding on mobile
        setCanvasHeight(180);
      } else if (screenWidth < 768) {
        // Small tablet
        setCanvasWidth(400);
        setCanvasHeight(200);
      } else if (screenWidth < 1024) {
        // Tablet
        setCanvasWidth(500);
        setCanvasHeight(220);
      } else {
        // Desktop
        setCanvasWidth(600);
        setCanvasHeight(240);
      }
    };

    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);
    return () => window.removeEventListener("resize", updateCanvasDimensions);
  }, []);

  const handleSave = () => {
    if (sigRef.current) {
      const dataUrl = sigRef.current.toDataURL("image/png");
      onSave(dataUrl);
      onClose();
    }
  };

  const handleClear = () => {
    sigRef.current?.clear();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-[95vw] sm:w-[85%] sm:max-w-md md:max-w-lg lg:max-w-2xl p-4 sm:p-6">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-center text-base sm:text-lg md:text-xl">
            Sign Here
          </DialogTitle>
        </DialogHeader>
        
        <div className="border-2 border-gray-300 rounded-lg p-2 flex justify-center bg-gray-50">
          <SignatureCanvas
            ref={sigRef}
            penColor="black"
            canvasProps={{
              width: canvasWidth,
              height: canvasHeight,
              className: "bg-white rounded border",
              style: { touchAction: 'none' } // Prevents scrolling on mobile when drawing
            }}
          />
        </div>
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-4 mt-4 pt-2">
          <Button 
            variant="outline" 
            onClick={handleClear}
            className="w-full sm:w-auto px-6 py-2"
          >
            Clear
          </Button>
          <Button 
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-2"
          >
            Save Signature
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignatureModal;