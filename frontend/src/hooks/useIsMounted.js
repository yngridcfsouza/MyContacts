import { useEffect, useRef, useCallback } from "react";

export default function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const getIsMounted = useCallback(() => isMounted.current, []);

  return getIsMounted;
}

/* essa é uma das formas para evitar dois problemas que prejudicam a aplicação; 1: quando a requisição é feita e continuam mesmo após desmontar a page; 2: quando ocorre erro ao tentar acessar propriedades no componente desmontado; e entendendo que mesmo sem warings podem ocorrer problemas na execução e que afetam o usuário;
-  */
