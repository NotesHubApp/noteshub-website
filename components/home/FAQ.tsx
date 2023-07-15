import { Accordion, AccordionModel } from '../common/Accordion';

import { FaqModel } from 'models/FaqModel';
import { Section } from './Section';
import { SectionTitle } from './SectionTitle';
import faqData from 'data/faq';
import { useState } from 'react';

type FaqProps = {
  data?: FaqModel[]
}

export default function Faq({ data = faqData }: FaqProps) {
  const [accordionData, setAccordionData] = useState(data.map<AccordionModel>(x => ({
    title: x.question,
    content: x.answer
  })));

  return (
    <Section id="faq">
      <SectionTitle>Frequently Asked Questions</SectionTitle>
      <Accordion data={accordionData} setData={setAccordionData} />
    </Section>
  )
}
