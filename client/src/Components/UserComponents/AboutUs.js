import React from "react";
import styled from "styled-components";
// import CountUp from 'react-countup';
import missionImg from "../../Assets/aboutUsImage.png";
import browseIcon from "../../Assets/BookVault_Logo.png";
import rentIcon from "../../Assets/BookVault_Logo.png";
import supportIcon from "../../Assets/BookVault_Logo.png";
// import { useInView } from 'react-intersection-observer';
import aboutImg from "../../Assets/libraryHomePage.png"
import { useNavigate } from "react-router-dom";

const Section = styled.section`
  background: #fefcff;
  color: #003366;
  overflow-x: hidden;

  @media (max-width: 1240px) {
    padding: 20px 10px;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  max-width: 1200px;
  margin: 60px auto;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextBlock = styled.div`
  flex: 1;
  min-width: 280px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  object-fit: cover;
`;

const Heading = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 20px;
  color: #001f4d;
`;

const Paragraph = styled.p`
  font-size: 1.3rem;
  line-height: 1.7;
  color: #555;
`;

const HeaderSection = styled.section`
  background-image: url(${aboutImg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 120px 20px;
  position: relative;
  color: white;
  overflow: hidden;
  margin-bottom: 60px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 51, 0.6);
    z-index: 1;
  }

  ${Flex} {
    position: relative;
    z-index: 2;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
  }

  ${Heading} {
    color: white;
    font-size: 3.2rem;
  }

  ${Paragraph} {
    color: #e0e0e0;
    max-width: 800px;
    font-size: 1.3rem;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin: 60px auto;
  flex-wrap: wrap;
  max-width: 1100px;
`;

const StatCard = styled.div`
  background: #fff;
  padding: 25px;
  min-width: 180px;
  flex: 1 1 200px;
  max-width: 240px;
  border-left: 5px solid rgb(9, 79, 154);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
  }
`;

const StatNumber = styled.h3`
  font-size: 2.2rem;
  color: rgb(9, 79, 154);
  margin-bottom: 10px;
`;

const StatLabel = styled.p`
  font-size: 1.1rem;
  color: rgb(66, 66, 66);
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin: 40px auto;
  max-width: 70vw;
`;

const Card = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  gap: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 500px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    font-size: 1.3rem;
    color: #003366;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
`;

const CTA = styled.div`
  background: linear-gradient(to right, #6b8dfd, rgb(220, 113, 151));
  padding: 50px 20px;
  text-align: center;
  border-radius: 16px;
  color: white;
  margin: 80px auto 0;
  max-width: 70vw;

  h2 {
    font-size: 2.2rem;
  }

  p {
    font-size: 1.2rem;
    margin-top: 10px;
  }
`;

const CTAButton = styled.button`
  background: white;
  color: #003366;
  border: none;
  padding: 12px 25px;
  font-size: 1rem;
  border-radius: 25px;
  margin: 20px auto 0;
  cursor: pointer;
  font-weight: 600;
  display: inline-block;
  transition: background 0.3s;

  &:hover {
    background: #f0f0f0;
  }
`;

const CenteredHeading = styled(Heading)`
  text-align: center;
  margin-top: 80px;
  margin-bottom: 30px;
`;


const offers = [
  {
    icon: browseIcon,
    title: "Explore Books",
    description:
      "Browse thousands of books from various categories and genres.",
  },
  {
    icon: rentIcon,
    title: "Rent Instantly",
    description: "Rent your desired books easily and get them delivered.",
  },
  {
    icon: supportIcon,
    title: "Chatbot Support",
    description: "Instant support via our Rasa chatbot for any queries.",
  },
];

const AboutUs = () => {
  const navigate = useNavigate();
  // const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <Section>
      {/* About Section */}
      <HeaderSection>
  <Flex>
    <Heading>About BookVault</Heading>
    <Paragraph>
      Book Vault is your one-stop digital library offering a seamless
      experience to browse, rent, and enjoy books across genres. Designed
      for readers and admins alike, it ensures hassle-free management and
      enriched reading.
    </Paragraph>
  </Flex>
</HeaderSection>


      {/* Stats */}
      <Stats>
        <StatCard>
          <StatNumber>100+</StatNumber>
          <StatLabel>Books Available</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>250+</StatNumber>
          <StatLabel>Books Rented</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>50+</StatNumber>
          <StatLabel>Registered Users</StatLabel>
        </StatCard>
      </Stats>

      {/* Mission */}
      <Flex>
        <TextBlock>
          <Heading>Our Mission</Heading>
          <Paragraph>
            We aim to ignite the love of reading by making quality books
            accessible to everyone, anytime, anywhere. With powerful features
            and an intuitive interface, we are revolutionizing how readers and
            admins experience books.
          </Paragraph>
        </TextBlock>
        <Image src={missionImg} alt="Our Mission" />
      </Flex>

      {/* What We Offer */}
      <CenteredHeading>What We Offer</CenteredHeading>

      <CardsGrid>
        {offers.map((offer, i) => (
          <Card key={i}>
            <Icon src={offer.icon} alt={offer.title} />
            <CardContent>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
            </CardContent>
          </Card>
        ))}
      </CardsGrid>

      <CTA>
        <h2>Ready to Dive into Your Next Read?</h2>
        <p>Explore thousands of books and enjoy reading like never before!</p>
<CTAButton onClick={() => navigate('/books')}>
        Browse Books
      </CTAButton>      </CTA>
    </Section>
  );
};

export default AboutUs;
