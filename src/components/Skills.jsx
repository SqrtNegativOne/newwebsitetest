export default function Skills() {
  const skills = [
    { name: "C", icon: "devicon-c-plain" },
    { name: "C++", icon: "devicon-cplusplus-plain" },
    { name: "Python", icon: "devicon-python-plain" },
    { name: "Django", icon: "devicon-django-plain" },
    { name: "Docker", icon: "devicon-docker-plain" },
    { name: "Git", icon: "devicon-git-plain" },
    { name: "Vim", icon: "devicon-vim-plain" },
    { name: "Pandas", icon: "devicon-pandas-plain" },
    { name: "Matplotlib", icon: "devicon-matplotlib-plain" },
    { name: "PyTorch", icon: "devicon-pytorch-plain" },
  ];

  return (
    <div className="text-column">
      <p className="section-intro">
        Technologies I have touched or have some experience with.
      </p>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-item">
            <i className={`${skill.icon} colored skill-icon`}></i>
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
