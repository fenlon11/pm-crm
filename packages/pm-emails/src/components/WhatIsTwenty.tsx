import { type I18n } from '@lingui/core';
import { MainText } from 'src/components/MainText';
import { SubTitle } from 'src/components/SubTitle';

type WhatIsTwentyProps = {
  i18n: I18n;
};

export const WhatIsTwenty = ({ i18n }: WhatIsTwentyProps) => {
  return (
    <>
      <SubTitle value={i18n._('What is Persistent Recruiter?')} />
      <MainText>
        {i18n._(
          "It's a modern recruiting CRM that helps high-performance teams manage candidates, pipelines, and relationships efficiently.",
        )}
      </MainText>
    </>
  );
};
