import axios from "axios";

const API_BASE_URL = "https://geome7ric-bee-kappa.vercel.app/api";

const mailingApiCall = "/services/mailing";

const fromMail = "matiasjriosb@gmail.com";

export const sendEmail = async (data: {
  from?: string;
  to?: string;
  name: string;
  email?: string;
  subject: string;
  message: string;
}) => {
  const url = `${API_BASE_URL}${mailingApiCall}`;

  let { subject, message } = data;
  const { name, email } = data;

  subject = `${subject} - ${email}`;
  message = `${message} - Escrito por ${name}`;

  data = {
    from: fromMail,
    name,
    to: fromMail,
    subject,
    message,
  };

  const options = {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    data,
    url,
  };

  return await axios(options);
};
