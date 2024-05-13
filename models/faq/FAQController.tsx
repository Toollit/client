import React, { FC, useCallback, useRef } from 'react';
import FAQView, { ViewProps } from './FAQView';

export interface ControllerProps {}

const FAQController: FC<ControllerProps> = ({}) => {
  const SearchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchFAQ = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      e.preventDefault();

      SearchInputRef.current?.blur();
    },
    [],
  );

  const props: ViewProps = {
    handleSearchFAQ,
    SearchInputRef,
  };

  return <FAQView {...props} />;
};

export default FAQController;
