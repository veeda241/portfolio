
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionWrapper = styled(motion.section)`
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
  background-color: rgba(0,0,0,0.6);
  border-radius: 12px;
  padding: 40px;
  margin: 30px auto;
  max-width: 800px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2em;
  margin-bottom: 15px;
  text-transform: uppercase;
  border-bottom: 1px solid #aaa;
  padding-bottom: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 6px;
  border: none;
  font-size: 1em;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 6px;
  border: none;
  font-size: 1em;
`;

const Button = styled.button`
  background-color: #ffd700;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
  border-radius: 6px;
  border: none;
  font-size: 1em;
`;

const SocialLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  text-align: center;
`;

const SocialLink = styled.li`
  display: inline-block;
  margin: 0 15px;
`;

const SocialLinkA = styled.a`
  color: #ffd700;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #00ffd5;
  }
`;

interface Social {
  name: string;
  url: string;
}

interface ContactProps {
  title: string;
  email: string;
  social: Social[];
}

const Contact: React.FC<ContactProps> = ({ title, email, social }) => {
  return (
    <SectionWrapper id="contact">
      <SectionTitle>{title}</SectionTitle>
      <Form action="/submit" method="POST">
        <label>Name:</label>
        <Input type="text" name="name" required />
        <label>Email:</label>
        <Input type="email" name="email" required />
        <label>Message:</label>
        <Textarea name="message" rows={5} required />
        <Button type="submit">Send</Button>
      </Form>
      <SocialLinks>
        <SocialLink>
          <SocialLinkA href={`mailto:${email}`}>Email</SocialLinkA>
        </SocialLink>
        {social.map((link, index) => (
          <SocialLink key={index}>
            <SocialLinkA href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </SocialLinkA>
          </SocialLink>
        ))}
      </SocialLinks>
    </SectionWrapper>
  );
};

export default Contact;
