"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  ImagePlus,
  LogOut,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { projects as fallbackProjects, type Project } from "@/lib/data";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { projectToRow, rowToProject } from "@/lib/projects-store";

const emptyProject: Project = {
  title: "",
  subtitle: "",
  description: "",
  challenge: "",
  outcome: "",
  tags: [],
  image: "/phishguard.svg",
  metric: "",
  period: "",
  caseStudyUrl: null,
  linkedinPostUrl: null,
  sortOrder: 0,
};

export default function AdminPage() {
  const configured = isSupabaseConfigured();
  const supabase = getSupabaseClient();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [tags, setTags] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function loadProjects() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order");
    if (error) return setNotice(error.message);
    setProjects(data?.map(rowToProject) ?? []);
  }

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null),
    );
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    // Project rows are synchronized from the authenticated external Supabase session.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) loadProjects();
    // loadProjects intentionally runs when authentication changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function login(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setNotice("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);
    if (error) setNotice(error.message);
  }

  function startEditing(project: Project) {
    setEditing({ ...project });
    setTags(project.tags.join(", "));
    setNotice("");
  }

  function storagePath(url: string) {
    const marker = "/storage/v1/object/public/project-images/";
    return url.includes(marker)
      ? decodeURIComponent(url.split(marker)[1])
      : null;
  }

  async function deleteStoredImage(url: string) {
    const path = storagePath(url);
    if (supabase && path)
      await supabase.storage.from("project-images").remove([path]);
  }

  async function uploadImage(file: File) {
    if (!supabase || !user || !editing) return;
    if (!file.type.startsWith("image/"))
      return setNotice("Choose an image file.");
    if (file.size > 5 * 1024 * 1024)
      return setNotice("Images must be 5 MB or smaller.");
    setBusy(true);
    setNotice("");
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
    const path = `${user.id}/${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabase.storage
      .from("project-images")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) {
      setBusy(false);
      return setNotice(error.message);
    }
    const { data } = supabase.storage.from("project-images").getPublicUrl(path);
    setEditing({ ...editing, image: data.publicUrl });
    setBusy(false);
    setNotice("Image uploaded. Save the project to keep this change.");
  }

  async function removeEditingImage() {
    if (!editing) return;
    setEditing({ ...editing, image: "/phishguard.svg" });
    setNotice("Image removed. Save the project to keep this change.");
  }

  async function saveProject(event: FormEvent) {
    event.preventDefault();
    if (!supabase || !editing) return;
    if (/\s/.test(editing.image)) {
      setNotice(
        "The image URL contains spaces. Upload an image or enter a valid URL/path.",
      );
      return;
    }
    setBusy(true);
    setNotice("");
    const project = {
      ...editing,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    const row = projectToRow(project);
    const result = project.id
      ? await supabase.from("projects").update(row).eq("id", project.id)
      : await supabase.from("projects").insert(row);
    setBusy(false);
    if (result.error) return setNotice(result.error.message);
    setEditing(null);
    setNotice("Project saved successfully.");
    await loadProjects();
  }

  async function removeProject(project: Project) {
    if (!supabase || !project.id || !window.confirm(`Delete ${project.title}?`))
      return;
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);
    if (error) return setNotice(error.message);
    await deleteStoredImage(project.image);
    setNotice("Project removed.");
    await loadProjects();
  }

  async function importStarterProjects() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase
      .from("projects")
      .insert(
        fallbackProjects.map((project, index) =>
          projectToRow({ ...project, sortOrder: index }),
        ),
      );
    setBusy(false);
    if (error) return setNotice(error.message);
    setNotice("Starter projects imported.");
    await loadProjects();
  }

  async function replaceWithApprovedProjects() {
    if (
      !supabase ||
      !window.confirm(
        "Remove every current project and replace them with the approved six projects?",
      )
    )
      return;

    setBusy(true);
    setNotice("");

    const { error: deleteError } = await supabase
      .from("projects")
      .delete()
      .not("id", "is", null);

    if (deleteError) {
      setBusy(false);
      setNotice(deleteError.message);
      return;
    }

    const { error: insertError } = await supabase
      .from("projects")
      .insert(
        fallbackProjects.map((project, index) =>
          projectToRow({ ...project, sortOrder: index }),
        ),
      );

    setBusy(false);
    if (insertError) {
      setNotice(insertError.message);
      return;
    }

    await loadProjects();
    setNotice("Catalog replaced with the approved six projects.");
  }

  if (!configured)
    return (
      <main className="admin-setup">
        <div>
          <span>Admin setup required</span>
          <h1>Connect Supabase to activate your project manager.</h1>
          <p>
            Copy <code>.env.example</code> to <code>.env.local</code>, add your
            Supabase URL and public anonymous key, then run{" "}
            <code>supabase/schema.sql</code> in the Supabase SQL editor.
          </p>
          <Link href="/">
            <ArrowLeft /> Back to portfolio
          </Link>
        </div>
      </main>
    );

  if (!user)
    return (
      <main className="admin-login">
        <form onSubmit={login}>
          <span>TharinduJB administration</span>
          <h1>Welcome back.</h1>
          <p>Sign in with the administrator account configured in Supabase.</p>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {notice && <strong>{notice}</strong>}
          <button disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
          <Link href="/">
            <ArrowLeft /> Back to portfolio
          </Link>
        </form>
      </main>
    );

  return (
    <main className="admin-page">
      <header>
        <div>
          <span>Portfolio CMS</span>
          <h1>Project manager</h1>
        </div>
        <div>
          <Link href="/projects">View projects</Link>
          <button onClick={() => supabase?.auth.signOut()}>
            <LogOut /> Logout
          </button>
        </div>
      </header>
      {notice && (
        <div className="admin-notice">
          {notice}
          <button onClick={() => setNotice("")}>
            <X />
          </button>
        </div>
      )}
      <section className="admin-toolbar">
        <div>
          <strong>{projects.length}</strong>
          <span>Managed projects</span>
        </div>
        {projects.length === 0 && (
          <button onClick={importStarterProjects} disabled={busy}>
            Import current projects
          </button>
        )}
        <button
          className="admin-replace"
          onClick={replaceWithApprovedProjects}
          disabled={busy}
        >
          Replace with approved 6
        </button>
        <button
          className="admin-add"
          onClick={() =>
            startEditing({ ...emptyProject, sortOrder: projects.length })
          }
        >
          <Plus /> Add project
        </button>
      </section>
      <section className="admin-project-list">
        {projects.map((project) => (
          <article key={project.id}>
            <div>
              <span>{project.period || "No date"}</span>
              <h2>{project.title}</h2>
              <p>{project.subtitle}</p>
            </div>
            <div>
              <button onClick={() => startEditing(project)}>
                <Pencil /> Edit
              </button>
              <button className="danger" onClick={() => removeProject(project)}>
                <Trash2 /> Delete
              </button>
            </div>
          </article>
        ))}
      </section>
      {editing && (
        <div
          className="admin-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Project editor"
        >
          <form onSubmit={saveProject}>
            <header>
              <div>
                <span>Project editor</span>
                <h2>{editing.id ? "Edit project" : "Add project"}</h2>
              </div>
              <button type="button" onClick={() => setEditing(null)}>
                <X />
              </button>
            </header>
            <div className="admin-form-grid">
              <label>
                Title
                <input
                  required
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                />
              </label>
              <label>
                Subtitle
                <input
                  required
                  value={editing.subtitle}
                  onChange={(e) =>
                    setEditing({ ...editing, subtitle: e.target.value })
                  }
                />
              </label>
              <label className="wide">
                Description
                <textarea
                  required
                  rows={3}
                  value={editing.description}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                />
              </label>
              <label className="wide">
                Challenge
                <textarea
                  required
                  rows={2}
                  value={editing.challenge}
                  onChange={(e) =>
                    setEditing({ ...editing, challenge: e.target.value })
                  }
                />
              </label>
              <label className="wide">
                Outcome
                <textarea
                  required
                  rows={2}
                  value={editing.outcome}
                  onChange={(e) =>
                    setEditing({ ...editing, outcome: e.target.value })
                  }
                />
              </label>
              <div className="admin-image-manager wide">
                <span>Project image</span>
                <div
                  className="admin-image-preview"
                  style={{ backgroundImage: `url("${editing.image}")` }}
                />
                <div>
                  <label className="admin-upload-button">
                    <ImagePlus /> {busy ? "Uploading…" : "Upload image"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                      disabled={busy}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) uploadImage(file);
                        event.target.value = "";
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="danger"
                    onClick={removeEditingImage}
                  >
                    <Trash2 /> Remove image
                  </button>
                </div>
                <label>
                  Or use an image URL
                  <input
                    required
                    value={editing.image}
                    onChange={(e) =>
                      setEditing({ ...editing, image: e.target.value })
                    }
                  />
                </label>
              </div>
              <label>
                Metric
                <input
                  value={editing.metric}
                  onChange={(e) =>
                    setEditing({ ...editing, metric: e.target.value })
                  }
                />
              </label>
              <label>
                Period
                <input
                  value={editing.period}
                  onChange={(e) =>
                    setEditing({ ...editing, period: e.target.value })
                  }
                />
              </label>
              <label>
                Sort order
                <input
                  type="number"
                  value={editing.sortOrder ?? 0}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      sortOrder: Number(e.target.value),
                    })
                  }
                />
              </label>
              <label className="wide">
                Technologies, comma separated
                <input value={tags} onChange={(e) => setTags(e.target.value)} />
              </label>
              <label>
                Case study URL
                <input
                  type="url"
                  value={editing.caseStudyUrl ?? ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      caseStudyUrl: e.target.value || null,
                    })
                  }
                />
              </label>
              <label>
                LinkedIn post URL
                <input
                  type="url"
                  value={editing.linkedinPostUrl ?? ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      linkedinPostUrl: e.target.value || null,
                    })
                  }
                />
              </label>
            </div>
            <footer>
              <button type="button" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button className="save" disabled={busy}>
                <Save /> {busy ? "Saving…" : "Save project"}
              </button>
            </footer>
          </form>
        </div>
      )}
    </main>
  );
}
