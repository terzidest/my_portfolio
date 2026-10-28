import AboutSection from '../components/about/AboutSection';
import EducationSection from '../components/about/EducationSection';
import ExperienceSection from '../components/about/ExperienceSection';
import SkillsSection from '../components/about/SkillsSection';
import usePageMeta from '../hooks/usePageMeta';

const About = () => {
  usePageMeta({
    title: 'About',
    description:
      'Background, skills, work experience, education, certifications and languages of Triantaphilos Terzides, senior frontend engineer.',
  });

  return (
    <div className="spotlight">
      <div className="mx-auto max-w-[1200px] px-5 pt-28 md:px-6 md:pt-40">
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
      </div>
    </div>
  );
};

export default About;
