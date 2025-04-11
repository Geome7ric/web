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
