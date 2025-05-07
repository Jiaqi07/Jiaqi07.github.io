interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
  twitterHandle?: string;
}

export const updateMetaTags = ({
  title,
  description = 'Personal portfolio website showcasing projects and research in robotics, AI, and computer science.',
  keywords = ['robotics', 'AI', 'machine learning', 'computer science', 'research', 'portfolio'],
  ogImage = '/images/og-image.jpg',
  ogUrl = 'https://yourdomain.com',
  twitterHandle = '@yourusername',
}: SEOProps): void => {
  // Update title
  document.title = `${title} | Alan Chen`;

  // Find or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', description);

  // Find or create meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', keywords.join(', '));

  // Open Graph tags
  const ogTags = {
    'og:title': title,
    'og:description': description,
    'og:image': ogImage,
    'og:url': ogUrl,
    'og:type': 'website',
  };

  Object.entries(ogTags).forEach(([property, content]) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('property', property);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
  });

  // Twitter Card tags
  const twitterTags = {
    'twitter:card': 'summary_large_image',
    'twitter:site': twitterHandle,
    'twitter:creator': twitterHandle,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': ogImage,
  };

  Object.entries(twitterTags).forEach(([name, content]) => {
    let metaTag = document.querySelector(`meta[name="${name}"]`);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', name);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
  });
};

export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://yourdomain.com';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

export const generateStructuredData = (type: 'Person' | 'Article' | 'WebSite', data: any): string => {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return JSON.stringify(baseStructuredData);
};

export const addStructuredData = (jsonLD: string): void => {
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.textContent = jsonLD;
  } else {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = jsonLD;
    document.head.appendChild(script);
  }
}; 