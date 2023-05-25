import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactNode;
  activeClassName: string;
}

export function ActiveLink({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) {
  const pathname = usePathname();

  const className = pathname === rest.href ? activeClassName : "";

  return (
    <Link className={className} {...rest}>
      {children}
    </Link>
  );
}