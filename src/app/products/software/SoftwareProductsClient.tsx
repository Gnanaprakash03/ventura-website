"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollAnimationWrapper } from '@/components/ScrollAnimationWrapper';
import { FaCheckCircle } from 'react-icons/fa';
import { useSearchParams, useRouter } from 'next/navigation';

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// Add export to the interface so it can be imported in page.tsx
export interface SoftwareProduct {
  _id: string;
  name: string;
  description: string;
  features: string[];
  imageUrl: string;
  slug: string;
}

export function SoftwareProductsClient({ products }: { products: SoftwareProduct[] }) {
  const searchParams = useSearchParams();
  const router = useRouter(); // Add this
  
  useEffect(() => {
    const productId = searchParams.get('product');
    if (productId) {
      console.log('Looking for product:', productId);
      
      // Add a small delay to ensure elements are mounted
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(productId);
        console.log('Found element for', productId, ':', element);
        
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center'
          });
          
          // Add highlight effect
          element.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
          setTimeout(() => {
            element.style.transition = 'background-color 0.5s ease';
            element.style.backgroundColor = '';
            
            // Clear the product parameter from URL after scrolling
            const url = new URL(window.location.href);
            url.searchParams.delete('product');
            router.replace(url.pathname + url.search, { scroll: false });
          }, 1000);
        }
      }, 500); // 500ms delay

      return () => clearTimeout(timeoutId);
    }
  }, [searchParams, router]);

  return (
    <div className="space-y-12">
      {products.map((product, index) => (
        <ScrollAnimationWrapper key={product._id}>
          <motion.div
            id={product.slug}
            variants={fadeInUp}
            className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {index === -10 ? (
              <div className="flex flex-col">
                <div className="mb-6">
                  <div className="relative w-full h-64">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="rounded-lg object-cover"
                      quality={100}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-blue-600">{product.name}</h2>
                  <p className="text-lg mb-6 text-gray-600">{product.description}</p>
                  <ul className="space-y-3">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <FaCheckCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row">
                <div className="mb-6 md:mb-0 md:mr-8 md:w-1/3">
                  <div className="relative w-full h-64 md:h-full">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="rounded-lg object-cover"
                      quality={100}
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-600">{product.name}</h2>
                  <p className="text-lg mb-6 text-gray-600">{product.description}</p>
                  <ul className="space-y-3">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <FaCheckCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </ScrollAnimationWrapper>
      ))}
    </div>
  );
}