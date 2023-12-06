import React, { useCallback, useEffect, useRef, useState } from 'react';
import FAQView, { FAQViewProps } from './FAQView';

export interface FAQControllerProps {}

const FAQController = ({}: FAQControllerProps) => {
  const SearchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchFAQ = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      e.preventDefault();

      SearchInputRef.current?.blur();
    },
    [],
  );

  const props: FAQViewProps = {
    handleSearchFAQ,
    SearchInputRef,
  };

  return <FAQView {...props} />;
};

export default FAQController;
