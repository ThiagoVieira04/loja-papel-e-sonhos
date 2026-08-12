import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/seo";
import { CATALOG_ITEMS } from "@/constants/catalog";
import { CATEGORY_SLUGS } from "@/constants/seo";

const STATIC_ROUTES = [
  "",
  "/sobre",
  "/contato",
  "/catalogo",
  "/categorias",
  "/faq",
  "/servicos",
  "/trabalhos",
  "/galeria",
  "/produtos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${SITE_URL}/categorias/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = CATALOG_ITEMS.map((item) => ({
    url: `${SITE_URL}/produto/${item.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}