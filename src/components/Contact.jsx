export default function Contact() {
  const socials = [
    { name: "GitHub", url: "https://github.com/SqrtNegativOne" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/ark-malhotra-431938323/" },
    { name: "Instagram", url: "https://www.instagram.com/sqrtnegativ1/" },
    { name: "Bluesky", url: "https://bsky.app/profile/sqrt-1.bsky.social" },
    { name: "LeetCode", url: "https://leetcode.com/u/sqrtnegativ1/" },
    { name: "Kaggle", url: "https://www.kaggle.com/sqrtnegativ1" },
  ];

  return (
    <div className="text-column">
      <div className="contact-group">
        <p className="contact-label">Email</p>
        <div className="contact-emails">
          <a href="mailto:sqrtnegativ1@gmail.com" className="contact-link">
            sqrtnegativ1@gmail.com
          </a>
          <a href="mailto:ark.malhotra.ug24@nsut.ac.in" className="contact-link">
            ark.malhotra.ug24@nsut.ac.in
          </a>
        </div>
      </div>

      <div className="contact-group">
        <p className="contact-label">Elsewhere</p>
        <div className="contact-socials">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              {s.name}
              <span className="link-arrow">&thinsp;&#8599;</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
