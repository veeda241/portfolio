
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import novaAiImage from '../assets/nova_ai.png';
import gansCnnsImage from '../assets/gans_cnns.png';
import nlpImage from '../assets/nlp.png';
import nlpNewImage from '../assets/nlp_new.png';

const BlogWrapper = styled.section`
  padding: 100px 40px;
  background: linear-gradient(45deg, #4ca1af, #1c3a5e, #2e8b57);
  color: white;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 3em;
  font-weight: 700;
  margin-bottom: 60px;
`;

const BlogPostsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
`;

const BlogPostCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 20px;
  width: 350px;
  text-align: left;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const BlogPostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const BlogPostTitle = styled.h2`
  font-size: 1.8em;
  font-weight: 600;
  margin-bottom: 10px;
`;

const BlogPostDescription = styled.p`
  font-size: 1em;
  line-height: 1.6;
`;

const blogPosts = [

  {
    id: 4,
    title: 'Meet Nova AI: Your Personal Emotional AI System',
    image: novaAiImage,
    description: 'The blog post introduces Nova AI, a next-generation Emotional AI System designed to understand and respond to human emotions with personalized empathy. It uses facial recognition and voice analysis, deep learning models, and a Node.js backend with MySQL. Nova AI aims to be a digital emotional support system, helping users express feelings and providing a safe, non-judgmental space. Future plans include real-time conversational AI, multi-language support, and integration with AI tutors.',
    url: 'https://techlearning17.blogspot.com/2025/05/meet-nova-ai-your-personal-emotional.html',
  },
  {
    id: 5,
    title: 'GANs vs. CNNs: The Power Behind AI Visual Recognition',
    image: gansCnnsImage,
    description: 'The blog post \'GANs vs. CNNs: The Power Behind AI Visual Recognition\' discusses two key AI technologies for visual data: Generative Adversarial Networks (GANs) and Convolutional Neural Networks (CNNs). CNNs analyze and classify visual data, used in medical imaging and self-driving cars. GANs generate new images, used in AI-generated art and deepfake technology. The choice depends on the task, and many modern AI applications combine both.',
    url: 'https://techlearning17.blogspot.com/2025/03/%20GANs%20vs.%20CNNs%20The%20Power%20Behind%20AI%20Visual%20Recognition.html',
  },
  {
    id: 6,
    title: 'Understanding Natural Language Processing (NLP): The Future of Human-Machine Communication',
    image: nlpNewImage,
    description: 'The blog post \'UNDERSTANDING NATURAL LANGUAGE PROCESSING (NLP): THE FUTURE OF HUMAN-MACHINE COMMUNICATION\' introduces Natural Language Processing (NLP) as a subfield of AI that enables machines to understand, analyze, and generate human language. It covers fundamental elements like tokenization, POS tagging, NER, sentiment analysis, machine translation, and text summarization. NLP techniques include rule-based systems, statistical models, and deep learning methods. It addresses challenges like ambiguity and sarcasm, and highlights applications in chatbots, social media monitoring, and customer support. The future of NLP involves multimodal NLP, zero-shot learning, and ethical AI.',
    url: 'https://techlearning17.blogspot.com/2025/03/understanding-natural-language.html',
  },
];

const Blog: React.FC = () => {
  return (
    <BlogWrapper id="blog">
      <PageTitle>My Blog</PageTitle>
      <BlogPostsContainer>
        {blogPosts.map((post) => (
          <BlogPostCard
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            onClick={() => window.open(post.url, '_blank')}
          >
            <BlogPostImage src={post.image} alt={post.title} />
            <BlogPostTitle>{post.title}</BlogPostTitle>
            <BlogPostDescription>{post.description}</BlogPostDescription>
          </BlogPostCard>
        ))}
      </BlogPostsContainer>
    </BlogWrapper>
  );
};

export default Blog;
