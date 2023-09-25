function slug(name: string) {
  const slug = name
    .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
  return slug;
}

export { slug };
