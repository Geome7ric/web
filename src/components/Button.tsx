import { cn } from "@/utils/utils";
import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  variant?: "primary" | "secondary";
}

export default function Button({
  icon: Icon,
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:backdrop-blur-sm",
        variant === "primary"
          ? "text-black dark:text-white shadow-lg hover:text-accent dark:hover:text-accent"
          : "text-black dark:text-white hover:backdrop-blur-sm hover:text-accent dark:hover:text-accent",
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon
          key={Icon.displayName}
          className="w-5 h-5 transition-all duration-400 pointer-events-none"
        />
      )}
      {children}
    </button>
  );
}
