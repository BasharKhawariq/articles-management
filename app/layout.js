"use client";
import localFont from "next/font/local";
import "./globals.css";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"; // Assuming ShadCN UI components are in the right place
import useLayoutStore from "@/stores/useLayoutStore"; // Import the Zustand store

export default function RootLayout({ children }) {
  // Get state and actions from Zustand store
  const { isLoading, notification, closeNotification } = useLayoutStore();

  return (
    <html lang="en">
      <body>
        {/* Render the page content */}
        {children}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
            <span className="loader"></span>
          </div>
        )}

        {/* Notification Modal */}
        <AlertDialog open={notification.show} onOpenChange={closeNotification}>
          <AlertDialogContent>
            <AlertDialogTitle>{notification.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {notification.message}
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction onClick={closeNotification}>
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </body>
    </html>
  );
}
