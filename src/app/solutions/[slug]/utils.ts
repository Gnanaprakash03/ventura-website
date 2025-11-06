import { client } from "@/sanity/lib/client";

export async function getIndustryPageData() {
  const query = `*[_type == "industryVerticalPage"]{
    "slug": slug.current,
    name,
    desc,
    workflow {
      src {
        asset->{
          url
        }
      }
    },
    objectives[] {
      icon,
      title,
      desc
    },
    software[] {
      title,
      text
    },
    hardware[] {
      title,
      text
    },
    features[] {
      title,
      text
    },
    benefits,
    image {
      src {
        asset->{
          url
        }
      },
      alt
    },
    ctaText,
    ctaLink,
    related[] {
      slug,
      name,
      "image": img {
        asset->{
          url
        }
      }
    }
  }`;
  const data = await client.fetch(query)
  // console.log(data);
  return data
}



export async function getOtherSolutionPageData() {
  const query = `*[_type == "otherSolutionPageType"]{
  "slug": slug.current,
    name,
    overview {
      desc,
      src {
        asset->{
          url
        }
      }
    },
    objectives[] {
      icon,
      title,
      desc
    },
    solutions[] {
      icon,
      title,
      desc
    },
    workflow[] {
      icon,
      title,
      desc
    },
    benefits[] {
      icon,
      title,
      desc
    },
    ctatitle,
    ctadesc,
    related[] {
      slug,
      name,
      "image": img {
        asset->{
          url
        }
      }
    }
  }`
  const data = await client.fetch(query)
  // console.log(data)
  return data
}