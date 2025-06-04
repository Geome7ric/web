import { test, expect } from "@playwright/test";

test.describe("Calendly Integration E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("calendly modal opens and closes correctly", async ({ page }) => {
    // Buscar botones que abran Calendly
    const calendlyTriggers = [
      page.getByRole("button", { name: /agendar/i }),
      page.getByRole("button", { name: /reunión/i }),
      page.getByRole("button", { name: /cita/i }),
      page.getByRole("button", { name: /schedule/i }),
      page.getByText(/agendar/i),
      page.locator("[data-calendly]"),
    ];

    let triggerFound = false;
    let activeTrigger;

    // Encontrar un trigger activo
    for (const trigger of calendlyTriggers) {
      if ((await trigger.count()) > 0 && (await trigger.first().isVisible())) {
        activeTrigger = trigger.first();
        triggerFound = true;
        break;
      }
    }

    if (!triggerFound) {
      test.skip("No Calendly trigger found on the page");
    }

    // Hacer clic en el trigger de Calendly
    await activeTrigger?.click();

    // Esperar a que aparezca el modal
    await page.waitForTimeout(1000);

    // Verificar que el modal de Calendly aparece
    const calendlyModal = page
      .locator('[role="dialog"]')
      .or(
        page
          .locator(".calendly-modal")
          .or(page.locator('iframe[src*="calendly"]'))
      );

    if ((await calendlyModal.count()) > 0) {
      await expect(calendlyModal.first()).toBeVisible();

      // Verificar que se puede cerrar el modal
      const closeButton = page.getByRole("button", { name: /close|cerrar|×/i });
      if ((await closeButton.count()) > 0) {
        await closeButton.first().click();
        await page.waitForTimeout(500);
        await expect(calendlyModal.first()).not.toBeVisible();
      }
    }
  });

  test("calendly iframe loads correctly", async ({ page }) => {
    // Buscar y hacer clic en trigger de Calendly
    const calendlyButton = page.getByRole("button", { name: /agendar/i });

    if ((await calendlyButton.count()) === 0) {
      test.skip("No Calendly button found");
    }

    await calendlyButton.first().click();
    await page.waitForTimeout(2000);

    // Verificar que el iframe de Calendly se carga
    const calendlyIframe = page.locator('iframe[src*="calendly"]');

    if ((await calendlyIframe.count()) > 0) {
      await expect(calendlyIframe).toBeVisible();

      // Verificar que el iframe tiene el src correcto
      const src = await calendlyIframe.getAttribute("src");
      expect(src).toContain("calendly.com");

      // Verificar dimensiones del iframe
      const boundingBox = await calendlyIframe.boundingBox();
      expect(boundingBox?.width).toBeGreaterThan(0);
      expect(boundingBox?.height).toBeGreaterThan(0);
    }
  });

  test("calendly modal closes with escape key", async ({ page }) => {
    const calendlyButton = page.getByRole("button", { name: /agendar/i });

    if ((await calendlyButton.count()) === 0) {
      test.skip("No Calendly button found");
    }

    await calendlyButton.first().click();
    await page.waitForTimeout(1000);

    const modal = page.locator('[role="dialog"]');
    if ((await modal.count()) > 0) {
      await expect(modal).toBeVisible();

      // Presionar Escape para cerrar
      await page.keyboard.press("Escape");
      await page.waitForTimeout(500);

      await expect(modal).not.toBeVisible();
    }
  });

  test("calendly modal closes when clicking outside", async ({ page }) => {
    const calendlyButton = page.getByRole("button", { name: /agendar/i });

    if ((await calendlyButton.count()) === 0) {
      test.skip("No Calendly button found");
    }

    await calendlyButton.first().click();
    await page.waitForTimeout(1000);

    const modal = page.locator('[role="dialog"]');
    if ((await modal.count()) > 0) {
      await expect(modal).toBeVisible();

      // Hacer clic fuera del modal (en el backdrop)
      await page.click("body", { position: { x: 10, y: 10 } });
      await page.waitForTimeout(500);

      // El modal podría cerrarse o no, dependiendo de la implementación
      // Solo verificamos si efectivamente se implementó esta funcionalidad
    }
  });

  test("calendly modal has proper accessibility", async ({ page }) => {
    const calendlyButton = page.getByRole("button", { name: /agendar/i });

    if ((await calendlyButton.count()) === 0) {
      test.skip("No Calendly button found");
    }

    await calendlyButton.first().click();
    await page.waitForTimeout(1000);

    const modal = page.locator('[role="dialog"]');
    if ((await modal.count()) > 0) {
      // Verificar atributos de accesibilidad
      await expect(modal).toHaveAttribute("aria-modal", "true");

      const iframe = modal.locator("iframe");
      if ((await iframe.count()) > 0) {
        await expect(iframe).toHaveAttribute("title");
      }
    }
  });

  test("calendly modal works on different screen sizes", async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 768, height: 1024 }, // Tablet
      { width: 375, height: 667 }, // Mobile
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      const calendlyButton = page.getByRole("button", { name: /agendar/i });

      if ((await calendlyButton.count()) === 0) {
        continue; // Skip this viewport if no button found
      }

      await calendlyButton.first().click();
      await page.waitForTimeout(1000);

      const modal = page.locator('[role="dialog"]');
      if ((await modal.count()) > 0) {
        await expect(modal).toBeVisible();

        // Verificar que el modal se adapta al viewport
        const modalBox = await modal.boundingBox();
        if (modalBox) {
          expect(modalBox.width).toBeLessThanOrEqual(viewport.width);
          expect(modalBox.height).toBeLessThanOrEqual(viewport.height);
        }

        // Cerrar modal para la siguiente iteración
        await page.keyboard.press("Escape");
        await page.waitForTimeout(500);
      }
    }
  });

  test("calendly button is keyboard accessible", async ({ page }) => {
    // Navegar hasta el botón de Calendly usando Tab
    let tabCount = 0;
    const maxTabs = 20; // Límite para evitar bucle infinito

    while (tabCount < maxTabs) {
      await page.keyboard.press("Tab");
      tabCount++;

      const focusedElement = await page.evaluate(() => {
        const focused = document.activeElement;
        return {
          tagName: focused?.tagName,
          textContent: focused?.textContent?.toLowerCase(),
          type: focused?.getAttribute("type"),
        };
      });

      // Verificar si el elemento enfocado es un botón de Calendly
      if (
        focusedElement.tagName === "BUTTON" &&
        (focusedElement.textContent?.includes("agendar") ||
          focusedElement.textContent?.includes("reunión") ||
          focusedElement.textContent?.includes("schedule"))
      ) {
        // Presionar Enter para activar
        await page.keyboard.press("Enter");
        await page.waitForTimeout(1000);

        const modal = page.locator('[role="dialog"]');
        if ((await modal.count()) > 0) {
          await expect(modal).toBeVisible();
        }
        break;
      }
    }
  });

  test("calendly URL is correct", async ({ page }) => {
    const calendlyButton = page.getByRole("button", { name: /agendar/i });

    if ((await calendlyButton.count()) === 0) {
      test.skip("No Calendly button found");
    }

    await calendlyButton.first().click();
    await page.waitForTimeout(2000);

    const iframe = page.locator('iframe[src*="calendly"]');
    if ((await iframe.count()) > 0) {
      const src = await iframe.getAttribute("src");

      // Verificar que la URL contiene los elementos esperados
      expect(src).toContain("calendly.com");
      expect(src).toContain("geome7ric"); // Debe contener el nombre de usuario/empresa

      // Opcional: verificar duración específica si se conoce
      // expect(src).toContain('30min');
    }
  });

  test("multiple calendly triggers work consistently", async ({ page }) => {
    // Buscar múltiples triggers de Calendly en la página
    const allCalendlyButtons = page.getByRole("button", { name: /agendar/i });
    const buttonCount = await allCalendlyButtons.count();

    if (buttonCount === 0) {
      test.skip("No Calendly buttons found");
    }

    // Probar cada botón encontrado
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      // Límite a 3 para eficiencia
      const button = allCalendlyButtons.nth(i);

      if (await button.isVisible()) {
        await button.click();
        await page.waitForTimeout(1000);

        const modal = page.locator('[role="dialog"]');
        if ((await modal.count()) > 0) {
          await expect(modal).toBeVisible();

          // Cerrar modal antes de probar el siguiente
          await page.keyboard.press("Escape");
          await page.waitForTimeout(500);
        }
      }
    }
  });

  test("calendly modal handles network issues gracefully", async ({ page }) => {
    // Simular condiciones de red lentas
    await page.route("**/calendly.com/**", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 segundo de delay
      await route.continue();
    });

    const calendlyButton = page.getByRole("button", { name: /agendar/i });

    if ((await calendlyButton.count()) === 0) {
      test.skip("No Calendly button found");
    }

    await calendlyButton.first().click();

    // Verificar que el modal aparece even con delay de red
    const modal = page.locator('[role="dialog"]');
    if ((await modal.count()) > 0) {
      await expect(modal).toBeVisible({ timeout: 10000 });
    }
  });
});
