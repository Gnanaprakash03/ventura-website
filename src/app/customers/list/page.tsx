import React from 'react';
import { client } from '@/lib/sanity';
import CustomerListContent from './CustomerListContent';

async function getCustomerList() {
  const customers = await client.fetch(`*[_type == "customerList"] {
    _id,
    name,
    "imageUrl": image.asset->url
  }`, {}, { next: { revalidate: 60 } });
  
  return customers;
}

export default async function CustomerList() {
  const customers = await getCustomerList();

  return <CustomerListContent customers={customers} />;
}
