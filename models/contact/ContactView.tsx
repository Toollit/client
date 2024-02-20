import React from 'react';
import {
  ButtonContainer,
  ContentContainer,
  Form,
  Header,
  MUIOption,
  MUISelect,
  SubTitle,
  TextArea,
  TextCount,
} from './styles';
import AppLayout from '@/components/appLayout';
import { InnerContainer } from '@/styles/commons';
import Title from '@/components/title';
import Input from '@/components/input';
import Label from '@/components/label';
import { Button } from '@/components/button';
import { SelectChangeEvent } from '@mui/material';

export interface ContactViewProps {
  options: string[];
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  type: string;
  content: string;
  contentLength: number;
  handleTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleType: (event: SelectChangeEvent<unknown>) => void;
  handleContent: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContactView = ({
  options,
  handleSubmit,
  title,
  type,
  content,
  contentLength,
  handleTitle,
  handleType,
  handleContent,
}: ContactViewProps) => {
  return (
    <AppLayout type='default'>
      <InnerContainer>
        <Header>
          <Title text='문의하기' />
        </Header>

        <Form onSubmit={handleSubmit}>
          <Label text='제목' />
          <Input value={title} onChange={handleTitle} />

          <Label text='유형' />
          <MUISelect value={type || ''} onChange={handleType}>
            {options.map((option) => {
              return (
                <MUIOption key={option} value={option}>
                  {option}
                </MUIOption>
              );
            })}
          </MUISelect>

          <Label text='내용' />
          <ContentContainer>
            <TextArea
              cols={30}
              rows={10}
              value={content}
              onChange={handleContent}
              maxLength={1000}
            />
            <TextCount>{contentLength}/1000</TextCount>
          </ContentContainer>

          <ButtonContainer>
            <Button type='submit' text='제출' width={15} />
          </ButtonContainer>
        </Form>
      </InnerContainer>
    </AppLayout>
  );
};

export default ContactView;
