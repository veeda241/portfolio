import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import novaAiImage from '../assets/nova_ai.png';
import gansCnnsImage from '../assets/gans_cnns.png';
import nlpNewImage from '../assets/nlp_new.png';
import AnimatedSectionTitle from './AnimatedSectionTitle';



const BlogWrapper = styled.section`
  padding: 100px 40px;
  background: #060a12;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;



const BlogPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
`;

const BlogPostCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.015);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 12px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(76,161,175,0.2), transparent, rgba(144,238,144,0.2));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const BlogPostImageWrapper = styled.div`
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(to top, rgba(6,10,18,1), transparent);
  }
`;

const BlogPostImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${BlogPostCard}:hover & {
    transform: scale(1.05);
  }
`;

const BlogPostContent = styled.div`
  padding: 20px 24px 24px;
`;

const BlogPostTitle = styled.h3`
  font-size: 1.1em;
  font-weight: 700;
  margin-bottom: 10px;
  color: white;
  line-height: 1.4;
  transition: color 0.3s ease;

  ${BlogPostCard}:hover & {
    color: #90ee90;
  }
`;

const BlogPostDescription = styled.p`
  font-size: 0.85em;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.45);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMore = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  font-family: 'JetBrains Mono', monospace;
  color: #4ca1af;
  font-size: 0.72em;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &::after {
    content: '→';
    transition: transform 0.3s ease;
  }

  ${BlogPostCard}:hover & {
    color: #90ee90;
    &::after { transform: translateX(4px); }
  }
`;

const blogPosts = [
  {
    id: 4,
    title: 'Meet Nova AI: Your Personal Emotional AI System',
    image: novaAiImage,
    description: 'Nova AI is a next-generation Emotional AI System designed to understand and respond to human emotions with personalized empathy using facial recognition, voice analysis, and deep learning models.',
    url: 'https://techlearning17.blogspot.com/2025/05/meet-nova-ai-your-personal-emotional.html',
  },
  {
    id: 5,
    title: 'GANs vs. CNNs: The Power Behind AI Visual Recognition',
    image: gansCnnsImage,
    description: 'Exploring two key AI technologies for visual data — Generative Adversarial Networks for creating images and Convolutional Neural Networks for analyzing and classifying visual data.',
    url: 'https://techlearning17.blogspot.com/2025/03/%20GANs%20vs.%20CNNs%20The%20Power%20Behind%20AI%20Visual%20Recognition.html',
  },
  {
    id: 6,
    title: 'Understanding NLP: The Future of Human-Machine Communication',
    image: nlpNewImage,
    description: 'An introduction to Natural Language Processing covering tokenization, POS tagging, NER, sentiment analysis, and the future of multimodal NLP and ethical AI.',
    url: 'https://techlearning17.blogspot.com/2025/03/understanding-natural-language.html',
  },
];

const Blog: React.FC = () => {
  return (
    <BlogWrapper id="blog">
      <AnimatedSectionTitle label="// blog_posts" title="My Blog" />
      <BlogPostsContainer>
        {blogPosts.map((post, index) => (
          <BlogPostCard
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => window.open(post.url, '_blank')}
          >
            <BlogPostImageWrapper>
              <BlogPostImage src={post.image} alt={post.title} />
            </BlogPostImageWrapper>
            <BlogPostContent>
              <BlogPostTitle>{post.title}</BlogPostTitle>
              <BlogPostDescription>{post.description}</BlogPostDescription>
              <ReadMore>Read Article</ReadMore>
            </BlogPostContent>
          </BlogPostCard>
        ))}
      </BlogPostsContainer>
    </BlogWrapper>
  );
};

export default Blog;
