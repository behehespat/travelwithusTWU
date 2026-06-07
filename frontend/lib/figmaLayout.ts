/** Координаты и размеры фрейма `main` (1920 px) из макета Figma. */
export const FIGMA_MAIN_WIDTH = 1920;
/** Нижняя граница контента (подвал - отдельно, как на остальных страницах). */
export const FIGMA_CONTENT_BOTTOM = 7817;
export const FIGMA_MAIN_HEIGHT = FIGMA_CONTENT_BOTTOM + 8;

export const figmaTop = (px: number) => `calc(${px}px - var(--twu-lead-gap, 0px))`;
