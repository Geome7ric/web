// src/app/api/send-confirmation/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getFullEmailSignatureHTML } from "@/components/EmailSignature";

const resend = new Resend("re_6mUNwcJY_6DXpHc24v8Qie8WPrFVNx8ty");

export async function POST(req: Request) {
  const { name, email, date, time } = await req.json();

  if (!name || !email || !date || !time) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios" },
      { status: 400 }
    );
  }

  try {
    // Formatear la fecha para mostrarla en el email
    const formattedDate = new Date(date).toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Determinar la URL base dinámicamente en función del host de la solicitud
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host = req.headers.get("host") || "www.geome7ric.com";
    const baseUrl = `${protocol}://${host}/`;

    // Usar la versión completa de la firma HTML
    const emailSignature = getFullEmailSignatureHTML({
      baseUrl: baseUrl,
    });

    const emailContent = `
      <div style="font-family: 'ProdigySans', Arial, sans-serif; color: #333333; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00EF91;">¡Tu reunión con Geome7ric está confirmada!</h1>
        
        <p>Hola ${name},</p>
        
        <p>¡Tu cita está confirmada! Estamos ansiosos de conocerte y entender mejor las necesidades de tu negocio para ofrecerte las mejores soluciones digitales.</p>
        
        <p><strong>En esta oportunidad, serás atendido por Matías Ríos</strong>, quien está muy entusiasmado de conversar contigo sobre tu proyecto.</p>
        
        <h2>Detalles de la reunión:</h2>
        <ul>
          <li><strong>Fecha:</strong> ${formattedDate}</li>
          <li><strong>Hora:</strong> ${time} (Zona horaria: Buenos Aires)</li>
          <li><strong>Duración:</strong> 30 minutos</li>
        </ul>
        
        <p style="background-color: #f8f9fa; padding: 10px; border-left: 4px solid #00EF91; margin: 20px 0;">
          <strong>Nota:</strong> Te hemos enviado un correo adicional con la invitación al evento que puedes agregar a tu calendario. Si no lo encuentras, revisa tu carpeta de spam.
        </p>
        
        <h3>¿Qué trataremos en la reunión?</h3>
        <p>Durante nuestro encuentro, nos enfocaremos en conocer a fondo tus necesidades y desafíos actuales. Exploraremos cómo nuestras soluciones pueden optimizar tus procesos y mejorar la productividad de tu equipo.</p>
        
        <h3>¿Cómo prepararte?</h3>
        <p>Si tienes algún desafío específico, problema o meta que te gustaría abordar durante nuestra conversación, anótalo para asegurarnos de cubrir todos los puntos importantes. También puedes compartir con nosotros cualquier material relevante con anticipación.</p>
        
        <h3>Si necesitas reprogramar o cancelar</h3>
        <p>Si por alguna razón necesitas <strong>reprogramar o cancelar</strong> la cita, 
        puedes encontrar los enlaces para hacerlo en el correo de invitación que te enviamos.
        </p>
        
        Si necesitas cambiar el horario o cancelar, te pedimos que nos avises con al menos <strong>24 horas de antelación</strong>.</p>
        
        <p>Si tienes alguna pregunta antes de nuestra charla, no dudes en contactarnos.</p>
        
        <p>Para asistencia rápida, también puedes escribirnos por WhatsApp o llamarnos:  
        <a href="https://wa.me/542916450794" target="_blank">WhatsApp</a> 
          o al número: <a href="tel:+5492916450794">+54 9 291 645 0794</a>.
        </p>
        
        <p>¡Esperamos conocerte pronto!<br>
        El equipo de Geome7ric</p>
      </div>
      ${emailSignature}
    `;

    const result = await resend.emails.send({
      from: "Geome7ric <hello@geome7ric.com>",
      to: email,
      subject: "¡Tu reunión con Geome7ric está confirmada!",
      html: emailContent,
    });

    const { error } = result;

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
