/** @jsx jsx */
import { useRef, useState } from "react";
import fetch from "isomorphic-unfetch";
import { jsx } from "theme-ui";
import { validateEmail } from "../../utils/helper.ts";
import {
  Container,
  Flex,
  Box,
  Button,
  Input,
  Text,
  Heading,
  Textarea,
  Label,
} from "theme-ui";

export default function Subscribe() {
  const inputEl = useRef(null);
  const inputName = useRef(null);
  const inputText = useRef(null);

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleMailChimpResponse = (errorMsg, successMsg) => {
    if (errorMsg) {
      setStatus({
        info: { error: true, msg: errorMsg },
      });

      return;
    }

    setStatus({
      submitted: true,
      submitting: false,
      info: { error: false, msg: successMsg },
    });
    inputEl.current.value = "";
  };

  const handleSendGridResponse = (status, msg) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      inputEl.current.value = "";
    } else {
      setStatus({
        info: { error: true, msg: msg },
      });
    }
  };

  const validateForm = () => {
    if (!inputName.current.value) {
      setStatus({
        info: { error: true, msg: "Please, enter your name." },
      });
      return false;
    }

    if (!inputEl.current.value || !validateEmail(inputEl.current.value)) {
      setStatus({
        info: { error: true, msg: "Please, enter a valid email address." },
      });
      return false;
    }

    if (!inputText.current.value) {
      setStatus({
        info: { error: true, msg: "Please, enter your message." },
      });
      return false;
    }

    return true;
  };

  const subscribe = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setStatus({
      submitting: true,
      info: { error: false, msg: null },
    });

    const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_FORM_URL, {
      body: JSON.stringify({
        name: inputName.current.value,
        email: inputEl.current.value,
        message: inputText.current.value,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "no-cors",
    });

    setStatus((prevStatus) => ({ ...prevStatus, submitting: false }));
    
    //for mailChimp integration
    // const { error } = await res.json();
    // handleMailChimpResponse(
    //   error,
    //   'Success! 🎉 You are now subscribed to the newsletter.'
    // );
    // // For sendGrid integration
    // const text = await res.text();
    // handleSendGridResponse(200, 'Success! 🎉 Yor message has been sent.');
  };

  return (
    <section id="contact">
      <Container>
        <Box sx={styles.contentBox}>
          <Box sx={styles.contentBoxInner}>
            <Heading as="h2" sx={styles.title}>
              Contact us
            </Heading>
            <Text as="p" sx={styles.description}>
              We are always happy to hear from you. Send us a message and we
              will get back to you as soon as possible. Use the form below to
              send us a message or use your{" "}
              <a href="mailto:contacto@geome7ric.com">email client</a>
            </Text>
            <form onSubmit={subscribe} method="POST">
              <Label sx={styles.label}>Name</Label>
              <Flex>
                <Input
                  htmlFor="email"
                  ref={inputName}
                  id="name"
                  name="name"
                  sx={styles.subscribeForm[".input"]}
                  placeholder="Enter your name"
                  hint="Enter your name"
                />
              </Flex>
              <Label sx={styles.label}>Email Address</Label>
              <Flex>
                <Input
                  ref={inputEl}
                  id="email"
                  name="email"
                  sx={styles.subscribeForm[".input"]}
                  placeholder="Enter your email address"
                />
              </Flex>

              <Label sx={styles.label}>Message</Label>
              <Textarea
                ref={inputText}
                id="message"
                name="message"
                sx={styles.subscribeForm[".textarea"]}
                placeholder="Enter your message"
              />
              {status.info.error && (
                <Text as="p" sx={styles.error}>
                  {status.info.msg}
                </Text>
              )}
              <Flex
                sx={{
                  justifyContent: "flex-center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  mt: 3,
                }}
              >
                <Button
                  sx={{
                    height: "48px",
                    borderRadius: "16px",
                  }}
                  disabled={status.submitting}
                  aria-label="Send"
                >
                  {!status.submitting
                    ? !status.submitted
                      ? "Send"
                      : "Sended"
                    : "Sending..."}
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      </Container>
    </section>
  );
}

const styles = {
  error: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "10px",
    marginTop: "10px",
  },
  label: {
    justfyContent: "flex-start",
    color: "white",
    lineHeight: [1.3, null, null, 1.25],
    fontWeight: "700",
    textAlign: "left",
    letterSpacing: ["-.5px", null, "-1.5px"],
    my: 4,
    ml: [3, null, null, 3],
  },
  contentBox: {
    backgroundColor: "none",
    textAlign: "center",
    borderRadius: 10,
    py: ["60px", null, 8],
  },
  contentBoxInner: {
    width: ["100%", null, "540px", "600px"],
    mx: "auto",
    mt: -1,
    px: [3, 5],
  },
  title: {
    fontFamily: "ProdigySansBold",
    fontSize: ["24px", null, "28px", null, null, "32px", null, "36px"],
    color: "white",
    lineHeight: [1.3, null, null, 1.25],
    fontWeight: "700",
    letterSpacing: ["-.5px", null, "-1.5px"],
    mb: [2, 3],
  },
  description: {
    fontSize: ["15px", 2, null, null, null, "17px", null, 3],
    color: "white",
    lineHeight: [1.85, null, null, 2],
    px: [0, null, 5],
  },

  subscribeForm: {
    mt: [6, null, null, 7],
    overflow: "hidden",
    p: [0, 1],
    flexDirection: ["column", "row"],
    ".input": {
      // borderRadius: 50,
      fontFamily: "ProdigySans",
      fontSize: ["14px", null, 2],
      fontWeight: 500,
      border: "1px solid #fff",
      py: 1,
      px: [4, null, 6],
      // backgroundColor: ['white', 'transparent'],
      height: ["52px", null, "60px"],
      textAlign: ["center", "left"],
      "&:focus": {
        boxShadow: "0 0 0 0px",
      },
      "::placeholder": {
        color: "primary",
        opacity: 1,
      },
    },
    ".textarea": {
      fontFamily: "ProdigySans",
      fontSize: ["14px", null, 2],
      fontWeight: 500,
      mt: [6, null, null, 3],
      py: 1,
      px: [4, null, 6],
      minHeight: "150px",
      textAlign: ["center", "left"],
      "&:focus": {
        boxShadow: "0 0 0 0px",
      },
      "::placeholder": {
        color: "primary",
        opacity: 1,
      },
    },
    ".submit": {
      flexShrink: 0,
      ml: [0, 2],
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      maxHeight: "12px",
      mt: [20, null, null, 3],
      // backgroundColor: ['text', 'primary'],
      py: ["400px"],
    },
  },
};
