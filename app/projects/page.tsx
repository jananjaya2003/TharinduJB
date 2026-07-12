import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import { getManagedProjects } from "@/lib/projects-store";

export const metadata: Metadata = {
  title: "Projects | TharinduJB",
  description:
    "Explore AI, machine learning, computer vision, cybersecurity, and full-stack projects by Tharindu J Bandara.",
  alternates: { canonical: "/projects" },
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getManagedProjects();
  return (
    <main className="projects-page">
      <header className="projects-page-nav">
        <Link href="/" className="brand">
          Tharindu<span>JB</span>
        </Link>
        <Link href="/#projects" className="projects-back">
          <ArrowLeft /> Back to portfolio
        </Link>
      </header>

      <section className="projects-page-hero">
        <span>Complete project archive</span>
        <h1>
          Ideas developed into
          <br />
          <em>working systems.</em>
        </h1>
        <p>
          Explore the challenges, technical decisions, and measurable outcomes
          behind my AI and software projects.
        </p>
      </section>

      <section className="projects-archive" aria-label="All projects">
        {projects.map((project, index) => (
          <article className="archive-project" key={project.title}>
            <div className="archive-project-image">
              <Image
                src={project.image}
                alt={`${project.title} project interface`}
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
                priority={index < 2}
              />
              <span>0{index + 1}</span>
              <strong>{project.metric}</strong>
            </div>
            <div className="archive-project-content">
              <span className="project-period">{project.period}</span>
              <h2>{project.title}</h2>
              <h3>{project.subtitle}</h3>
              <p>{project.description}</p>
              <dl className="archive-project-details">
                <div>
                  <dt>Challenge</dt>
                  <dd>{project.challenge}</dd>
                </div>
                <div>
                  <dt>Outcome</dt>
                  <dd>{project.outcome}</dd>
                </div>
              </dl>
              <div className="chips">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="archive-project-links">
                {project.caseStudyUrl && (
                  <a
                    href={project.caseStudyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Case study <ExternalLink />
                  </a>
                )}
                {project.linkedinPostUrl && (
                  <a
                    href={project.linkedinPostUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn post <ExternalLink />
                  </a>
                )}
                <a
                  href="https://github.com/jananjaya2003"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitBranch /> GitHub profile
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="projects-page-cta">
        <span>Have an opportunity or project in mind?</span>
        <h2>Let&apos;s build something useful.</h2>
        <div className="projects-cta-actions">
          <Link href="/#contact">
            Start a conversation <ExternalLink />
          </Link>
          <Link href="/admin" className="admin-entry">
            Portfolio admin <ExternalLink />
          </Link>
        </div>
      </section>
    </main>
  );
}
