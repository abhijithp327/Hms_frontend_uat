import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AlertCustomModalProps {
  isVisible?: boolean;
  onClose?: () => void;
  title?: string;
  message?: string;
}

const AlertCustomModal: React.FC<AlertCustomModalProps> = ({
  isVisible = true,
  onClose,
  title = "",
  message = ""
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <Card className="w-full bg-white max-w-md relative animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Close button */}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-6 w-6"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}

        <CardContent className="pt-8 pb-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Success Icon */}
            <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold tracking-tight">
              {title}
            </h3>

            {/* Message */}
            <p className="text-sm text-muted-foreground max-w-sm">
              {message}
            </p>

            {/* Success Alert */}
            <Alert className="w-full border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-300">
                Form submitted successfully
              </AlertDescription>
            </Alert>

            {/* Action Button */}
            {onClose && (
              <Button onClick={onClose} className="w-full bg-gradient-to-r from-primaryBlue to-primary">
                Continue
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


export default AlertCustomModal;