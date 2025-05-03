export const sendEmail = async ({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, subject, message }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al enviar el formulario");
  }

  return data;
};

export const sendConfirmationEmail = async ({
  name,
  email,
  date,
  time,
}: {
  name: string;
  email: string;
  date: string;
  time: string;
}) => {
  const response = await fetch("/api/send-confirmation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, date, time }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al enviar el correo de confirmación");
  }

  return data;
};
