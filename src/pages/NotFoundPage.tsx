import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md md:max-w-2xl overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center">
            {/* Illustration Section */}
            <div className="flex-1 mb-8 md:mb-0 md:mr-8 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-24 w-24 md:h-32 md:w-32 text-primary" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary/20 rounded-full p-4">
                  <div className="text-5xl md:text-6xl font-bold text-primary">404</div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
              <p className="text-gray-600 mb-6">
                Sorry, we couldn't find the page{" "}
                <code className="relative rounded bg-gray-100 px-1 py-0.5 text-sm font-mono text-gray-900">
                  {location.pathname}
                </code>
              </p>
              
              {/* <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button asChild>
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                  </Link>
                </Button>
              </div> */}

              {/* Additional helpful links */}
              {/* <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Here are some helpful links instead:</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <Link to="/driver" className="text-sm text-primary hover:underline">
                    Dashboard
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link to="/diver-reports" className="text-sm text-primary hover:underline">
                    All Reports
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link to="/diver-settings" className="text-sm text-primary hover:underline">
                    Settings
                  </Link>
                </div>
              </div> */}

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;