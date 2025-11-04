import React from 'react';
import { client } from '@/lib/sanity';
import CustomerSuccessContent from './CustomerSuccessContent';

async function getCustomerSuccessStories() {
  const stories = await client.fetch(`*[_type == "customerSuccess"] {
    _id,
    name,
    position,
    company,
    quote,
    image
  }`, {}, { next: { revalidate: 60 } });
  
  return stories;
}

export default async function CustomerSuccess() {
  const stories = await getCustomerSuccessStories();

  return <CustomerSuccessContent stories={stories} />;
}

