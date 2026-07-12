import { projects as fallbackProjects, type Project } from "@/lib/data";
import { getSupabaseClient } from "@/lib/supabase";

type ProjectRow = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  outcome: string;
  tags: string[] | null;
  image: string;
  metric: string;
  period: string;
  case_study_url: string | null;
  linkedin_post_url: string | null;
  sort_order: number;
};

export function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    challenge: row.challenge,
    outcome: row.outcome,
    tags: row.tags ?? [],
    image: row.image,
    metric: row.metric,
    period: row.period,
    caseStudyUrl: row.case_study_url,
    linkedinPostUrl: row.linkedin_post_url,
    sortOrder: row.sort_order,
  };
}

export function projectToRow(project: Project) {
  return {
    title: project.title,
    subtitle: project.subtitle,
    description: project.description,
    challenge: project.challenge,
    outcome: project.outcome,
    tags: project.tags,
    image: project.image,
    metric: project.metric,
    period: project.period,
    case_study_url: project.caseStudyUrl || null,
    linkedin_post_url: project.linkedinPostUrl || null,
    sort_order: project.sortOrder ?? 0,
  };
}

export async function getManagedProjects(): Promise<Project[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return fallbackProjects;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");
  if (error || !data?.length) return fallbackProjects;

  // Keep the public catalog limited to the six approved projects. Older rows
  // may still exist in Supabase from previous imports, so select at most one
  // matching row per approved title and use the local approved project as the
  // fallback when a matching database row is missing.
  const rows = (data as ProjectRow[]).map(rowToProject);
  return fallbackProjects.map((approved, index) => {
    const managed = rows.find((project) => project.title === approved.title);
    return managed
      ? { ...approved, ...managed, image: approved.image, sortOrder: index }
      : { ...approved, sortOrder: index };
  });
}
