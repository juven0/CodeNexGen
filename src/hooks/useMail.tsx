import emailjs from "@emailjs/browser";

export function useMail() {
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  const sendMail = async (form: HTMLFormElement) => {
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form, {
        publicKey: PUBLIC_KEY,
      })
      .then()
      .catch();
  };

  return { sendMail };
}
