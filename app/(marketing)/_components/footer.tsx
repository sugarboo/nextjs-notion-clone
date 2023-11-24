import { Button } from "@/components/ui/button";
import Logo from "./logo";

const Footer = () => {
  return (
    <div className="flex items-center w-full p-6 z-50 bg-background dark:bg-[#1F1F1F]">
      <div className="hidden md:block">
        <Logo />
      </div>
      <div className="md:ml-auto w-full flex justify-between md:justify-end items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">Privacy Policy</Button>
        <Button variant="ghost" size="sm">Terms & Conditions</Button>
      </div>
    </div>
  );
}
 
export default Footer;
