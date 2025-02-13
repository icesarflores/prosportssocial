  import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { X } from "lucide-react";

// Custom Threads icon component
const ThreadsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V12c.013-3.771.86-6.77 2.523-8.909C5.854.827 8.686-.113 12.175 0h.007c3.579.024 6.334 1.205 8.185 3.509 1.644 2.052 2.495 4.906 2.495 8.424v.068c-.013 3.771-.86 6.77-2.523 8.909-1.831 2.264-4.663 3.204-8.153 3.09zm-.716-3.812c.249.008.494.013.734.013 1.896 0 3.34-.531 4.398-1.621 1.206-1.244 1.846-3.095 1.902-5.497v-.068c0-2.46-.573-4.398-1.703-5.763-1.108-1.335-2.73-2.018-4.832-2.033-1.894 0-3.34.531-4.398 1.621-1.206 1.244-1.846 3.095-1.902 5.497v.068c0 2.46.574 4.398 1.703 5.763 1.108 1.335 2.73 2.018 4.832 2.033h.266z" />
  </svg>
);

// Custom TikTok icon component
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-footer text-footer-foreground border-t z-40">
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm">
            <Button
              variant="link"
              className="text-footer-foreground"
              onClick={() => (window.location.href = "/about")}
            >
              About
            </Button>
            <Button
              variant="link"
              className="text-footer-foreground"
              onClick={() => (window.location.href = "/terms")}
            >
              Terms
            </Button>
            <Button
              variant="link"
              className="text-footer-foreground"
              onClick={() => (window.location.href = "/privacy")}
            >
              Privacy
            </Button>
            <Button variant="link" className="text-footer-foreground">
              Cookies
            </Button>
            <Button variant="link" className="text-footer-foreground">
              Newsletter
            </Button>
            <Button
              variant="link"
              className="text-footer-foreground"
              onClick={() => (window.location.href = "/advertise")}
            >
              Advertise with us
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-footer-foreground">
              <X className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-footer-foreground">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-footer-foreground">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-footer-foreground">
              <Youtube className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
