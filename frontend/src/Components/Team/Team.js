import React from 'react';
import styled from 'styled-components';

const TeamMember = ({ name, role, imageUrl }) => (
  <MemberCard>
    <img src={imageUrl} alt={name} />
    <div className="content">
      <h5>{name}</h5>
      <p>{role}</p>
    </div>
  </MemberCard>
);

function Team() {
  return (
    <TeamContainer>
      <h2>Our Team</h2>
      <div><h4>Akshit Bahl & Ananya Priya</h4></div>
      <div className="team-row">
        <TeamMember
          name="Akshit Bahl"
          role="Web and ML Engineer"
          imageUrl="/images/team/akshit.jpeg"
        />
        <TeamMember
          name="Ananya Priya"
          role="Web Developer"
          imageUrl="/images/team/ananya.jpg"
        />
      </div>
    </TeamContainer>
  );
}

// Styled Components
const TeamContainer = styled.div`
  padding: 4rem 0;
  text-align: center;

  h2 {
    color: #ff1493;
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  .team-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }
`;

const MemberCard = styled.div`
  background-color: #fff0f5;
  border: 2px solid #ff69b4;
  border-radius: 10px;
  overflow: hidden;
  width: 50%;
  max-width: 500px;
  text-align: center;

  img {
    width: 35%;
    height: 200px;
    object-fit: cover;
  }

  .content {
    padding: .5rem;

    h5 {
      color: #ff1493;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    p {
      color: #ff69b4;
      font-size: 1rem;
    }
  }
`;

export default Team;
