# 🚀 GUÍA DE DESPLIEGUE INMEDIATO - GEOME7RIC LANDING

**Estado actual**: ✅ Código listo, build exitoso  
**Tiempo estimado**: 6-11 horas (1-2 días)  
**Fecha**: 3 de Junio, 2025  
**Proyecto Google**: unique-alloy-460802-j0 (ya configurado)

---

## 📋 ESTADO ACTUAL - TODO LISTO PARA LANZAR

### ✅ Completado

- [x] Build exitoso sin errores (verificado 3 Jun 2025)
- [x] Código optimizado y limpio
- [x] SEO implementado completamente
- [x] Internacionalización (ES/EN) funcionando
- [x] Sistema de emails configurado con Resend
- [x] Variables de entorno template creado
- [x] Proyecto Google Cloud configurado: `unique-alloy-460802-j0`
- [x] OpenAI API key disponible

### 🔄 Próximos Pasos CRÍTICOS

- [ ] Configurar Firebase Analytics con proyecto existente
- [ ] Obtener API key de Resend
- [ ] Configurar Sentry para monitoreo
- [ ] Desplegar a Vercel
- [ ] Configurar dominio geome7ric.com

---

## 🔥 PASO 1: CONFIGURAR FIREBASE ANALYTICS (30 min)

### 1.1 Usar Proyecto Existente

**Tu proyecto ya está configurado**: `unique-alloy-460802-j0`

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Seleccionar proyecto existente: **unique-alloy-460802-j0**
3. Si no existe, crearlo usando las credenciales que tienes

### 1.2 Habilitar Analytics

1. **Firebase Console** → Proyecto: unique-alloy-460802-j0
2. **Analytics** → **Comenzar**
3. **Configurar Google Analytics** → Usar cuenta existente de Google
4. **Configurar Analytics** → Seleccionar región España/América

### 1.3 Configurar Web App

1. **Configuración del proyecto** (⚙️)
2. **Tus aplicaciones** → **Web** (</>) → **Añadir app**
3. **Nombre**: "Geome7ric Landing"
4. **URL**: geome7ric.com (cuando esté disponible)
5. **También configurar Firebase Hosting**: ✅ Sí
6. **Copiar configuración** y actualizar `.env.local`:

```env
# Actualizar estas variables en tu .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy_tu_clave_aquí
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=unique-alloy-460802-j0.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=unique-alloy-460802-j0
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=unique-alloy-460802-j0.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=76338501745
NEXT_PUBLIC_FIREBASE_APP_ID=1:76338501745:web:tu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-TU_MEASUREMENT_ID
```

---

## 📧 PASO 2: CONFIGURAR RESEND PARA EMAILS (15 min)

### 2.1 Crear Cuenta Resend

1. Ir a [https://resend.com/](https://resend.com/)
2. **Sign up** con email: hello@geome7ric.com (o tu email principal)
3. **Verificar email**
4. **Plan gratuito**: 3,000 emails/mes (suficiente para empezar)

### 2.2 Obtener API Key

1. **Dashboard** → **API Keys** → **Create API Key**
2. **Nombre**: "Geome7ric Landing Production"
3. **Permisos**: Send emails
4. **Copiar clave** y actualizar `.env.local`:

```env
RESEND_API_KEY=re_tu_clave_resend_aquí
```

### 2.3 Configurar Email From

1. Por defecto puedes usar: `onboarding@resend.dev`
2. Para personalizar: **Domains** → **Add Domain** → `geome7ric.com`
3. (Esto lo haremos después de configurar el dominio)

---

## 🔍 PASO 3: CONFIGURAR SENTRY PARA MONITOREO (15 min)

### 3.1 Crear Proyecto Sentry

1. Ir a [https://sentry.io/](https://sentry.io/)
2. **Sign up** o **Login**
3. **Create Project** → **Next.js**
4. **Nombre del proyecto**: "geome7ric-landing"

### 3.2 Obtener DSN

1. **Settings** → **Projects** → geome7ric-landing
2. **Client Keys (DSN)**
3. **Copiar DSN** y actualizar `.env.local`:

```env
SENTRY_DSN=https://tu_sentry_dsn@sentry.io/proyecto_id
NEXT_PUBLIC_SENTRY_DSN=https://tu_sentry_dsn@sentry.io/proyecto_id
```

---

## 🌐 PASO 4: DESPLEGAR A VERCEL (45 min)

### 4.1 Verificar y Subir Código

```powershell
# Verificar que todo esté commiteado
git status

# Si hay cambios pendientes
git add .
git commit -m "feat: configuración completa para producción"
git push origin main
```

### 4.2 Instalar Vercel CLI

```powershell
# Instalar Vercel CLI globalmente
npm install -g vercel

# Login a Vercel
vercel login
# Seguir instrucciones para autenticarse
```

### 4.3 Desplegar Proyecto

```powershell
# Desde la raíz del proyecto
cd "C:\Users\mjrca\Documents\GitHub\Geome7ric-Landing"

# Desplegar a producción
vercel --prod

# Seguir las instrucciones:
# ? Set up and deploy "~/Documents/GitHub/Geome7ric-Landing"? [Y/n] y
# ? Which scope should contain your project? [Use arrows to select]
# ? Link to existing project? [y/N] n
# ? What's your project's name? geome7ric-landing
# ? In which directory is your code located? ./
```

### 4.4 Configurar Variables de Entorno en Vercel

1. **Vercel Dashboard** → [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. **Tu proyecto** → **Settings** → **Environment Variables**
3. **Agregar cada variable** de tu `.env.local`:

```env
# Variables críticas para agregar:
OPENAI_API_KEY=sk-proj-DZU5FaSM13HqNVZ8nPfU...
RESEND_API_KEY=re_tu_clave_resend
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=unique-alloy-460802-j0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=unique-alloy-460802-j0.firebaseapp.com
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=unique-alloy-460802-j0.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=76338501745
NEXT_PUBLIC_FIREBASE_APP_ID=1:76338501745:web:tu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-TU_MEASUREMENT_ID
NODE_ENV=production
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_BASE_URL=https://tu-proyecto.vercel.app
NEXT_PUBLIC_CONTACT_EMAIL=hello@geome7ric.com
CONTACT_EMAIL_TO=hello@geome7ric.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/geome7ric
SENTRY_DSN=https://tu_sentry_dsn@sentry.io/proyecto_id
NEXT_PUBLIC_SENTRY_DSN=https://tu_sentry_dsn@sentry.io/proyecto_id
```

### 4.5 Redesplegar con Variables

```powershell
# Después de configurar las variables
vercel --prod
```

---

## 🌍 PASO 5: CONFIGURAR DOMINIO PERSONALIZADO (1-2 horas)

### 5.1 Verificar Disponibilidad del Dominio

```bash
# Verificar si geome7ric.com está disponible
# Opciones de compra:
# - Namecheap.com (recomendado)
# - GoDaddy.com
# - Google Domains
# - Vercel Domains (integrado)
```

### 5.2 Adquirir Dominio

1. **Opción A - Vercel Domains (recomendado)**:

   - Vercel Dashboard → Domains → Buy Domain
   - Buscar: `geome7ric.com`
   - Comprar directamente desde Vercel

2. **Opción B - Proveedor externo**:
   - Comprar en Namecheap/GoDaddy
   - Luego configurar DNS

### 5.3 Configurar DNS (si usas proveedor externo)

**En tu proveedor de dominio:**

```dns
# Records a configurar:
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 5.4 Agregar Dominio en Vercel

1. **Vercel Dashboard** → **Domains**
2. **Add Domain** → `geome7ric.com`
3. **Add** → Seguir instrucciones
4. **Esperar propagación** (10-30 minutos)

### 5.5 Actualizar URLs de Producción

```env
# Actualizar en Vercel Environment Variables:
NEXT_PUBLIC_BASE_URL=https://geome7ric.com
```

---

## 🧪 PASO 6: TESTING COMPLETO (2-3 horas)

### 6.1 Testing Funcional

**Verificar en https://geome7ric.com:**

- [ ] ✅ Página principal carga correctamente
- [ ] ✅ Cambio de idioma ES/EN funciona
- [ ] ✅ Navegación desktop y mobile
- [ ] ✅ Formulario de contacto envía emails
- [ ] ✅ Modal de Calendly abre correctamente
- [ ] ✅ Blog posts cargan sin errores
- [ ] ✅ Portfolio funciona correctamente
- [ ] ✅ Enlaces internos funcionan
- [ ] ✅ Imágenes cargan optimizadas

### 6.2 Testing Cross-Browser

**Probar en diferentes navegadores:**

- [ ] ✅ Chrome (Windows/Mac/Mobile)
- [ ] ✅ Firefox (Windows/Mac)
- [ ] ✅ Safari (Mac/iOS)
- [ ] ✅ Edge (Windows)
- [ ] ✅ Samsung Internet (Android)

### 6.3 Testing de Performance

**Herramientas para usar:**

```bash
# 1. Google PageSpeed Insights
https://pagespeed.web.dev/
URL: https://geome7ric.com

# 2. GTmetrix
https://gtmetrix.com/
URL: https://geome7ric.com

# 3. Lighthouse (Chrome DevTools)
F12 → Lighthouse → Generate report
```

**Objetivos de performance:**

- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >95

### 6.4 Testing Mobile

**Verificar responsive design:**

- [ ] ✅ iPhone (Safari)
- [ ] ✅ Android (Chrome)
- [ ] ✅ iPad (Safari)
- [ ] ✅ Tablet Android (Chrome)

---

## 📊 PASO 7: CONFIGURAR ANALYTICS COMPLETO (1 hora)

### 7.1 Google Analytics 4

1. **Google Analytics** → [https://analytics.google.com/](https://analytics.google.com/)
2. **Admin** → **Create Property**
3. **Property Details**:
   - Property name: "Geome7ric Landing"
   - Country: España
   - Currency: EUR
4. **Data stream**: Web
5. **Website URL**: https://geome7ric.com
6. **Stream name**: Geome7ric Landing
7. **Copiar Measurement ID** (G-XXXXXXXXXX)
8. **Actualizar** `.env.local` si es diferente al de Firebase

### 7.2 Google Search Console

1. **Search Console** → [https://search.google.com/search-console/](https://search.google.com/search-console/)
2. **Add Property** → **URL prefix**
3. **URL**: https://geome7ric.com
4. **Verify ownership**:
   - Opción HTML tag (más fácil)
   - Copiar meta tag y agregar a `layout.tsx`
5. **Submit sitemap**: https://geome7ric.com/sitemap.xml

### 7.3 Verificar Firebase Analytics Funcionando

```javascript
// Abrir Chrome DevTools en tu sitio
// Console → Escribir:
console.log("Firebase Analytics:", window.gtag);
// Debe mostrar la función gtag

// Verificar eventos en Firebase Console:
// Analytics → Events → Realtime
// Navegar por tu sitio y ver eventos
```

---

## ✅ PASO 8: CHECKLIST FINAL DE LANZAMIENTO

### 8.1 Pre-Launch Verification

- [ ] **🌐 URL principal**: https://geome7ric.com funciona
- [ ] **🔒 SSL**: Certificado válido (candado verde)
- [ ] **📱 Mobile**: Responsive design funciona
- [ ] **🌍 i18n**: Cambio ES/EN funciona
- [ ] **📧 Emails**: Formulario envía emails correctamente
- [ ] **📊 Analytics**: Firebase registra eventos
- [ ] **🔍 SEO**: Meta tags presentes en todas las páginas
- [ ] **⚡ Performance**: Lighthouse >90 en todas las métricas
- [ ] **🎨 Design**: Branding corporativo consistente
- [ ] **📝 Content**: Todo el contenido está en producción

### 8.2 Final Deployment Commands

```powershell
# Comando final de despliegue
cd "C:\Users\mjrca\Documents\GitHub\Geome7ric-Landing"

# Verificar build local
npm run build

# Si todo está OK, deploy final
git add .
git commit -m "feat: configuración final de producción - READY FOR LAUNCH 🚀"
git push origin main

# Deploy a producción
vercel --prod

# Verificar que todo funciona
# Abrir: https://geome7ric.com
```

### 8.3 Post-Launch Immediate Actions (Primera hora)

- [ ] **📊 Monitoreo**: Revisar Sentry para errores
- [ ] **📈 Analytics**: Verificar que Firebase está registrando visitas
- [ ] **📧 Email Test**: Enviar email de prueba desde el formulario
- [ ] **📱 Social Share**: Compartir en redes sociales personales
- [ ] **🔍 Google**: Búsqueda manual "site:geome7ric.com"
- [ ] **🎯 Team Notification**: Notificar al equipo que el sitio está live

---

## 🎯 SIGUIENTES PASOS (POST-LAUNCH)

### Semana 1 - Monitoreo y Optimización

- [ ] **📊 Analytics Review**: Revisar métricas de usuarios
- [ ] **⚡ Performance**: Optimizar si hay problemas
- [ ] **🐛 Bug Fixes**: Solucionar errores encontrados
- [ ] **📝 Content**: Ajustar contenido basado en feedback

### Semana 2-4 - Mejoras y Automatización

- [ ] **🤖 n8n Setup**: Configurar automatizaciones avanzadas
- [ ] **📧 Email Marketing**: Configurar newsletter
- [ ] **🎯 CRM Integration**: Conectar con HubSpot/Pipedrive
- [ ] **📱 Social Media**: Integrar feeds sociales

### Mes 2-3 - Escalabilidad

- [ ] **🔍 SEO Avanzado**: Optimización técnica
- [ ] **♿ Accessibility**: Audit completo A11y
- [ ] **🌐 CDN**: Optimizar entrega global
- [ ] **📊 Advanced Analytics**: Eventos personalizados

---

## 🆘 TROUBLESHOOTING COMÚN

### Error 1: Build Falla

```powershell
# Limpiar y reinstalar dependencias
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run build
```

### Error 2: Variables de Entorno No Funcionan

```javascript
// Verificar en browser console
console.log(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
// Debe mostrar: unique-alloy-460802-j0

// Si muestra undefined:
// 1. Verificar que la variable empiece con NEXT_PUBLIC_
// 2. Verificar que esté en Vercel Environment Variables
// 3. Redesplegar después de agregar variables
```

### Error 3: Emails No Se Envían

```bash
# Verificar:
# 1. RESEND_API_KEY está configurada correctamente
# 2. Email "from" es válido
# 3. No hay límites de rate en Resend
# 4. Revisar logs en Vercel Functions
```

### Error 4: Firebase Analytics No Funciona

```javascript
// Verificar configuración:
console.log(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID);

// Verificar que ambos muestren valores válidos
// Si no, revisar variables de entorno en Vercel
```

### Error 5: Dominio No Funciona

```bash
# Verificar DNS propagación:
# Herramienta: https://www.whatsmydns.net/
# Buscar: geome7ric.com
# Tipo: A record
# Debe mostrar: 76.76.19.61 globalmente
```

---

## 📞 RECURSOS DE AYUDA

### Documentación Oficial

- **Vercel**: [https://vercel.com/docs](https://vercel.com/docs)
- **Firebase**: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- **Resend**: [https://resend.com/docs](https://resend.com/docs)
- **Next.js**: [https://nextjs.org/docs](https://nextjs.org/docs)

### Soporte Técnico

- **Vercel**: help@vercel.com
- **Firebase**: Firebase Console → Support
- **Resend**: support@resend.com
- **Sentry**: support@sentry.io

### Comunidades

- **Next.js Discord**: [https://nextjs.org/discord](https://nextjs.org/discord)
- **Vercel Discord**: [https://vercel.com/discord](https://vercel.com/discord)
- **Stack Overflow**: Tag: nextjs, vercel, firebase

---

## 🎉 ¡FELICITACIONES!

**Si has completado todos estos pasos, tu proyecto Geome7ric Landing Page ya está LIVE y funcionando correctamente.**

### 🏆 Lo que has logrado:

- ✅ **Sitio web profesional** completamente funcional
- ✅ **SEO optimizado** para posicionamiento
- ✅ **Performance optimizada** para velocidad
- ✅ **Experiencia de usuario** excepcional
- ✅ **Sistema de contacto** automatizado
- ✅ **Analytics** para medir resultados
- ✅ **Monitoring** para detectar problemas
- ✅ **Escalabilidad** para crecimiento futuro

### 📈 Métricas esperadas (Primera semana):

- **Performance**: >90 en Lighthouse
- **SEO**: Indexación completa en Google
- **Conversión**: Primeros contactos vía formulario
- **Tráfico**: Primeras visitas orgánicas

### 🚀 Tu sitio web está listo para:

- **Generar leads** de alta calidad
- **Posicionar tu marca** profesionalmente
- **Crecer con tu negocio** de forma escalable
- **Competir** con las mejores empresas del sector

---

**🎯 El futuro digital de Geome7ric comienza AHORA.**

_Guía creada el 3 de Junio, 2025 | Status: PRODUCTION READY 🚀_
