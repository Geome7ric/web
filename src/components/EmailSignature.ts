// src/components/EmailSignature.ts

/**
 * Genera el HTML para la firma de correo electrónico de Geome7ric
 *
 * @param options - Opciones de configuración para la firma
 * @returns HTML de la firma de correo
 */
export function generateEmailSignature(
  options: {
    name?: string; // Nombre para sobreescribir "Matías Ríos"
    title?: string; // Título para sobreescribir "INGENIERO EN COMPUTACIÓN"
    baseUrl: string; // URL base para los recursos (ej: https://www.geome7ric.com)
  } = { baseUrl: "https://www.geome7ric.com" }
): string {
  // Valores por defecto
  const baseUrl = options.baseUrl.endsWith("/")
    ? options.baseUrl
    : `${options.baseUrl}/`;

  // Ruta a la imagen de la firma
  const signatureImageUrl = `${baseUrl}sign.png`;

  return `<img src="${signatureImageUrl}" alt="Geome7ric Email Signature" style="max-width: 100%;">`;
}

/**
 * Genera el HTML completo para la firma de correo, incluyendo el DOCTYPE y los estilos necesarios.
 * Esta versión es útil si necesitas el HTML completo por alguna razón específica.
 */
export function getFullEmailSignatureHTML(
  options: {
    name?: string;
    title?: string;
    baseUrl: string;
  } = { baseUrl: "https://www.geome7ric.com" }
): string {
  return generateEmailSignature(options);
}
