'use client';

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { fullBlog } from "../../lib/interface";
import { client } from "../../lib/sanity";
import AboutTopBand from "../../components/AboutTopBand";
import {PortableText} from '@portabletext/react'

export default function BlogArticle({params}: {params: {slug: string}}) {
  const [data, setData] = useState<fullBlog | null>(null);
  const [highRes, setHighRes] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const query = `
        *[_type == "blog" && slug.current == '${params.slug}'] {
          "currentSlug": slug.current,
          title,
          author,
          category,
          content
        }[0]`;

      const result = await client.fetch(query);
      setData(result);
    };

    getData();
  }, [params.slug]);

  return (
    <Layout 
      pageName={data?.category || 'default'}
      highRes={highRes} 
      setHighRes={setHighRes} 
      isAboutHovered={isAboutHovered} 
      setIsAboutHovered={setIsAboutHovered}
    >
      <div className="flex flex-col items-center justify-center min-h-screen">
      <AboutTopBand pageName={data?.category || 'default'} />
      <main className="w-full h-screen gridParent px-5">
        <article className="col-start-1 col-end-6 md:col-start-3 md:col-end-12 lg:col-start-4 lg:col-end-13 about flex flex-col gap-20 pt-40 pb-40">
            <div className="flex flex-col gap-0.5">
                <h1 className="text-white cloud-shadow-black dark:cloud-shadow-white dark:text-black text-[21px] font-normal leading-normal z-10 max-w-[400px]">{data?.title}</h1>
                <p className="cloud-shadow-grey inset-8">{data?.author}</p>
            </div>
            <div className="prose">
                <PortableText value={data?.content} />
            </div>
      </article>
      </main>
      </div>
    </Layout>
  );
}