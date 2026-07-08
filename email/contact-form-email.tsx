import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ContactFormEmailProps = {
  name: string;
  senderEmail: string;
  message: string;
};

const main: React.CSSProperties = {
  backgroundColor: "#f3f0ea",
  color: "#22190f",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const container: React.CSSProperties = {
  margin: "0 auto",
  padding: "24px 0",
  maxWidth: "560px",
};

const card: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "32px 40px",
  border: "1px solid #e1d0b1",
};

const heading: React.CSSProperties = {
  fontSize: "18px",
  lineHeight: "1.4",
  fontWeight: 700,
  margin: "0 0 16px",
};

const label: React.CSSProperties = {
  fontSize: "12px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#7c6b54",
  margin: "0 0 4px",
};

const value: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 16px",
  whiteSpace: "pre-wrap",
};

const hr: React.CSSProperties = {
  borderColor: "#e1d0b1",
  margin: "20px 0",
};

export default function ContactFormEmail({
  name,
  senderEmail,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your portfolio contact form</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <Heading style={heading}>
              New message from your portfolio site
            </Heading>
            <Text style={label}>From</Text>
            <Text style={value}>
              {name} &lt;{senderEmail}&gt;
            </Text>
            <Hr style={hr} />
            <Text style={label}>Message</Text>
            <Text style={value}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
