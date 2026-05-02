import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import novaAiImage from '../assets/nova_ai.png';
import gansCnnsImage from '../assets/gans_cnns.png';
import nlpNewImage from '../assets/nlp_new.png';
import AnimatedSectionTitle from './AnimatedSectionTitle';



const BlogWrapper = styled.section`
  padding: ${props => props.theme.space[8]} ${props => props.theme.space[6]};
  background: ${props => props.theme.colors.surface.base};
  color: ${props => props.theme.colors.text.primary};
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${props => props.theme.space[6]} ${props => props.theme.space[4]};
  }
`;

const BlogPostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${props => props.theme.space[5]};
  max-width: 1200px;
  margin: 0 auto;
`;

const BlogPostCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface.muted};
  border: 1px solid ${props => props.theme.colors.border.default};
  border-radius: ${props => props.theme.radius.md};
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: all ${props => props.theme.motion.normal} cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.theme.shadows[2]};

  &:hover {
    border-color: ${props => props.theme.colors.accent.default};
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows[3]};
  }
`;

const BlogPostImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;
`;

const BlogPostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${props => props.theme.motion.normal} ease;

  ${BlogPostCard}:hover & {
    transform: scale(1.1);
  }
`;

const BlogPostContent = styled.div`
  padding: ${props => props.theme.space[5]};
`;

const BlogPostTitle = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.25em;
  font-weight: 900;
  margin-bottom: ${props => props.theme.space[2]};
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.3;
  text-transform: uppercase;
  transition: color ${props => props.theme.motion.fast} ease;

  ${BlogPostCard}:hover & {
    color: ${props => props.theme.colors.accent.default};
  }
`;

const BlogPostDescription = styled.p`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.95em;
  line-height: 1.6;
  color: ${props => props.theme.colors.text.secondary};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${props => props.theme.space[4]};
`;

const ReadMore = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.space[2]};
  font-family: ${props => props.theme.fonts.secondary};
  color: ${props => props.theme.colors.accent.default};
  font-size: 0.8em;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all ${props => props.theme.motion.fast} ease;

  &::after {
    content: '→';
    transition: transform ${props => props.theme.motion.fast} ease;
  }

  ${BlogPostCard}:hover & {
    &::after { transform: translateX(6px); }
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
