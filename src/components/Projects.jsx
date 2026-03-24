import "./Projects.css";

export default function Projects() {
  return (
    <div className="text-column">
      <div className="bio">
        <p>
          I do things, sometimes. Some of them can be found on my
          {" "}
          <a
            href="https://github.com/SqrtNegativOne"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            Github profile
          </a>.
        </p>
      </div>

      <blockquote className="testimonial">
        <p>&ldquo;Wow, this is really high quality code; great job!&rdquo;</p>
        <footer>&mdash; Me, on someone else&rsquo;s work.</footer>
      </blockquote>
    </div>
  );
}
