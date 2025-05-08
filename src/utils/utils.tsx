export const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

/**
 * Función para desplazarse a un elemento con un offset específico
 * @param id - ID del elemento al que se quiere desplazar
 * @param offset - Píxeles de offset desde la parte superior (por defecto 100px)
 */
export const scrollToElement = (id: string, offset: number = 100) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
