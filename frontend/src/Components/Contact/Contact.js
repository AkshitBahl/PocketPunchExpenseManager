import React, { useState } from 'react';
import styled from 'styled-components';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <FormWrapper>
        <ContactForm onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormField>
          <SubmitButton type="submit">Submit</SubmitButton>
        </ContactForm>
      </FormWrapper>
    </ContactContainer>
  );
}

export default Contact;

// Styled Components
const ContactContainer = styled.div`
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fdf6fb;
`;

const Title = styled.h2`
  color: #ff1493;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-align: center;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #fff0f5;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #ff69b4;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ff69b4;
  border-radius: 5px;
  outline: none;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ff69b4;
  border-radius: 5px;
  outline: none;
`;

const SubmitButton = styled.button`
  background-color: #ff1493;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff69b4;
  }
`;
