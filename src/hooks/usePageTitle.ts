import { useEffect } from "react";

const BASE = "RootKeeper";

const usePageTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `Hassayoun Malek Aziz | Security Engineer & AI Developer`;
  }, [title]);
};

export default usePageTitle;
