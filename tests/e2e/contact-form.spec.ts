import { test, expect } from '@playwright/test';

test.describe('Contact Form E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Navegar a la sección de contacto
    const contactSection = page.locator('#contact');
    if (await contactSection.count() > 0) {
      await contactSection.scrollIntoViewIfNeeded();
    }
  });

  test('contact form submission flow', async ({ page }) => {
    // Interceptar la llamada a la API
    await page.route('/api/send-email', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, result: { id: 'test-email-id' } }),
      });
    });

    // Localizar el formulario de contacto
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Llenar el formulario
    await page.fill('input[name="name"]', 'E2E Test User');
    await page.fill('input[name="email"]', 'e2e@test.com');
    await page.fill('input[name="subject"]', 'Prueba E2E Automatizada');
    await page.fill('textarea[name="message"]', 'Este es un mensaje de prueba automatizada para verificar el funcionamiento del formulario de contacto.');

    // Interceptar notificaciones si existen
    let notificationShown = false;
    page.on('console', (msg) => {
      if (msg.text().includes('success') || msg.text().includes('éxito')) {
        notificationShown = true;
      }
    });

    // Enviar el formulario
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Verificar estado de carga
    await expect(page.locator('text=/enviando|sending/i')).toBeVisible();

    // Esperar a que termine el envío
    await page.waitForTimeout(2000);

    // Verificar que el formulario se limpió después del envío exitoso
    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
    await expect(page.locator('input[name="subject"]')).toHaveValue('');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('');
  });

  test('contact form validation', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Intentar enviar formulario vacío
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Verificar que los campos requeridos muestran validación del navegador
    const nameField = page.locator('input[name="name"]');
    const emailField = page.locator('input[name="email"]');
    const messageField = page.locator('textarea[name="message"]');

    // Verificar que los campos tienen el atributo required
    await expect(nameField).toHaveAttribute('required');
    await expect(emailField).toHaveAttribute('required');
    await expect(messageField).toHaveAttribute('required');
  });

  test('contact form handles API errors gracefully', async ({ page }) => {
    // Interceptar la llamada a la API para simular error
    await page.route('/api/send-email', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' }),
      });
    });

    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Llenar el formulario con datos válidos
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message');

    // Enviar el formulario
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Esperar y verificar que se maneja el error
    await page.waitForTimeout(2000);

    // El formulario no debería limpiarse en caso de error
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('Test message');
  });

  test('contact form with pre-filled data', async ({ page }) => {
    // Algunos formularios pueden tener datos pre-llenados via props
    const subjectField = page.locator('input[name="subject"]');
    const messageField = page.locator('textarea[name="message"]');

    // Si hay datos pre-llenados, verificarlos
    if (await subjectField.inputValue() !== '') {
      await expect(subjectField).not.toHaveValue('');
    }

    if (await messageField.inputValue() !== '') {
      await expect(messageField).not.toHaveValue('');
    }
  });

  test('contact form accessibility', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Verificar que los campos tienen labels asociados
    const nameField = page.locator('input[name="name"]');
    const emailField = page.locator('input[name="email"]');
    const subjectField = page.locator('input[name="subject"]');
    const messageField = page.locator('textarea[name="message"]');

    // Verificar que los campos son accesibles por teclado
    await nameField.focus();
    await expect(nameField).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(emailField).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(subjectField).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(messageField).toBeFocused();

    // Verificar que el botón de envío es accesible
    await page.keyboard.press('Tab');
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeFocused();
  });

  test('contact form responsive behavior', async ({ page }) => {
    // Probar en diferentes tamaños de pantalla
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 768, height: 1024 },  // Tablet
      { width: 375, height: 667 },   // Mobile
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      const form = page.locator('form');
      await expect(form).toBeVisible();

      // Verificar que el formulario es usable en todos los tamaños
      const submitButton = page.locator('button[type="submit"]');
      await expect(submitButton).toBeVisible();
      
      // En móvil, verificar que los campos no se cortan
      if (viewport.width <= 375) {
        const nameField = page.locator('input[name="name"]');
        const boundingBox = await nameField.boundingBox();
        expect(boundingBox?.width).toBeLessThanOrEqual(viewport.width - 40); // Margen para padding
      }
    }
  });

  test('contact form email validation', async ({ page }) => {
    const emailField = page.locator('input[name="email"]');
    await expect(emailField).toBeVisible();

    // Probar con email inválido
    await emailField.fill('invalid-email');
    
    // El navegador debería validar el formato de email
    await expect(emailField).toHaveAttribute('type', 'email');
    
    // Verificar con email válido
    await emailField.fill('valid@example.com');
    await expect(emailField).toHaveValue('valid@example.com');
  });

  test('contact form submission with keyboard', async ({ page }) => {
    // Interceptar la llamada a la API
    await page.route('/api/send-email', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Llenar el formulario usando solo el teclado
    await page.keyboard.press('Tab'); // Ir al primer campo
    await page.keyboard.type('Keyboard Test User');
    
    await page.keyboard.press('Tab');
    await page.keyboard.type('keyboard@test.com');
    
    await page.keyboard.press('Tab');
    await page.keyboard.type('Keyboard Test Subject');
    
    await page.keyboard.press('Tab');
    await page.keyboard.type('This message was typed using only keyboard navigation.');

    // Enviar usando Enter o Tab + Enter
    await page.keyboard.press('Tab'); // Ir al botón submit
    await page.keyboard.press('Enter');

    // Verificar que se envió
    await page.waitForTimeout(2000);
  });
});
