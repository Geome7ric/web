/** @jsx jsx */
import { useRef, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Button, Input, Text, Heading , Textarea } from 'theme-ui';

export default function Subscribe() {
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  const inputName = useRef(null);
  const inputText = useRef(null);
  // 2. Hold a status in state to handle the response from our API.
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });
  
  const handleMailChimpResponse = (errorMsg, successMsg) => {
    if (errorMsg) {
      // 4. If there was an error, update the message in state.
      setStatus({
        info: { error: true, msg: errorMsg },
      });

      return;
    }

    // 5. Clear the input value and show a success message.
    setStatus({
      submitted: true,
      submitting: false,
      info: { error: false, msg: successMsg },
    });
    inputEl.current.value = '';
  };

  const handleSendGridResponse = (status, msg) => {
    if (status === 200) {
      // 5. Clear the input value and show a success message.
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      inputEl.current.value = '';
    } else {
      setStatus({
        info: { error: true, msg: msg },
      });
    }
  };
  const subscribe = async (e) => {
    e.preventDefault();
    // setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    // 3. Send a request to our API with the user's email address.
    const res = await fetch('https://matias-api.vercel.app/api/contact', {
      body: JSON.stringify({
        name: inputName.current.value,
        subject: inputName.current.value,
        from: inputEl.current.value,
        html: inputText.current.value,
        text: ''
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST', 
      mode: 'no-cors',
    });
    console.log(res)
    //for mailChimp integration
    // const { error } = await res.json();
    // handleMailChimpResponse(
    //   error,
    //   'Success! 🎉 You are now subscribed to the newsletter.'
    // );
    // // For sendGrid integration
    // const text = await res.text();
    // handleSendGridResponse(res.status, text);
  };
  return (
    <section>
      <Container>
        <Box sx={styles.contentBox}>
          <Box sx={styles.contentBoxInner}>
            <Heading as="h2" sx={styles.title}>
              Contact us
            </Heading>
            <Text as="p" sx={styles.description}>
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elitsed eiusmod
              tempor incididunt labore dolore. */}
            </Text>
            <form onSubmit={subscribe} sx="display: flex">                
                <label htmlFor="email" sx={styles.label}>
                  Name
                </label>
                <Flex >
                  
                  <Input
                    ref={inputName}
                    id="name"
                    name="name"
                    sx={styles.subscribeForm['.input']}
                    placeholder="Enter your name"
                  />
                </Flex>
                <label htmlFor="email" sx={styles.label}>
                  Email Address
                </label>
                <Flex >
                
                <Input
                  ref={inputEl}
                  id="email"
                  name="email"
                  sx={styles.subscribeForm['.input']}
                  placeholder="Enter your email address"
                />

                <div>
                  {status.info.error && (
                    <div className="error">Error: {status.info.msg}</div>
                  )}
                  {!status.info.error && status.info.msg && (
                    <div className="success">{status.info.msg}</div>
                  )}
                </div>
                
              </Flex>

              <Textarea ref={inputText} id="message" name="message" sx={styles.subscribeForm['.textarea']} placeholder="Enter your message" />  
              <Flex >
                <Button
                  sx={styles.subscribeForm['.submit']}
                  disabled={status.submitting}
                  aria-label="Send"
                >
                  {!status.submitting
                    ? !status.submitted
                      ? 'Send'
                      : 'Sended'
                    : 'Sending...'}
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
  label: {
    color: 'white',
    lineHeight: [1.3, null, null, 1.25],
    fontWeight: '700',
    textAlign: 'left',
    letterSpacing: ['-.5px', null, '-1.5px'],
    flexDirection: 'row',
    mb: [2, 3],
  },
  contentBox: {
    backgroundColor: 'none',
    textAlign: 'center',
    borderRadius: 10,
    py: ['60px', null, 8],
  },
  contentBoxInner: {
    width: ['100%', null, '540px', '600px'],
    mx: 'auto',
    mt: -1,
    px: [3, 5],
  },
  title: {
    fontSize: ['24px', null, '28px', null, null, '32px', null, '36px'],
    color: 'white',
    lineHeight: [1.3, null, null, 1.25],
    fontWeight: '700',
    letterSpacing: ['-.5px', null, '-1.5px'],
    mb: [2, 3],
  },
  description: {
    fontSize: ['15px', 2, null, null, null, '17px', null, 3],
    color: 'white',
    lineHeight: [1.85, null, null, 2],
    px: [0, null, 5],
  },
  
  subscribeForm: {
    mt: [6, null, null, 7],
    overflow: 'hidden',
    p: [0, 1],
    flexDirection: ['column', 'row'],
    '.input': {
      // borderRadius: 50,
      fontFamily: 'body',
      fontSize: ['14px', null, 2],
      fontWeight: 500,
      py: 1,
      px: [4, null, 6],
      // backgroundColor: ['white', 'transparent'],
      height: ['52px', null, '60px'],
      textAlign: ['center', 'left'],
      '&:focus': {
        boxShadow: '0 0 0 0px',
      },
      '::placeholder': {
        color: 'primary',
        opacity: 1,
      },
    },
    '.textarea': {
      fontFamily: 'body',
      fontSize: ['14px', null, 2],
      fontWeight: 500,
      mt: [6, null, null, 3],
      py: 1,
      px: [4, null, 6],
      textAlign: ['center', 'left'],
      '&:focus': {
        boxShadow: '0 0 0 0px',
      },
      '::placeholder': {
        color: 'primary',
        opacity: 1,
      },
    },
    '.submit': {
      flexShrink: 0,
      ml: [0, 2],
      mt: [20, null, null, 3],
      // backgroundColor: ['text', 'primary'],
      py: ['400px'],
    },
  },
};
