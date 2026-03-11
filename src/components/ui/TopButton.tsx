"use client";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Monitora o scroll da página
  useEffect(() => {
    const toggleVisibility = () => {
      // Mostra o botão se o scroll for maior que 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Função para voltar ao topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        // 1. Container relativo para o tooltip (classe 'group')
        //    Posicionado fixo no canto da tela
        <div className="fixed bottom-6 right-6 z-50 group">
          <button
            type="button"
            // Classes de estilo do botão
            className="flex justify-center items-center w-12 h-12 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 z-50 animate-fade-in p-3 rounded-full 
            bg-primary-blue
            text-neutral-100 border-transparent
            shadow-lg hover:shadow-2xl hover:shadow-neutral-600/25
                  "
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp size={30} />
          </button>

          {/* 2. O Tooltip */}
          <span
            className="absolute bottom-full mb-2  -translate-x-1/2  
                       px-4 py-1.5 rounded-lg bg-neutral-900 text-neutral-300 text-sm font-medium
                       shadow-lg
                       transition-all duration-200 ease-in-out
                       scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100
                       origin-bottom whitespace-nowrap inline-flex items-center"
          >
            Back to top
          </span>
        </div>
      )}
    </>
  );
}
