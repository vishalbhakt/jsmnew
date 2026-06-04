import heroImage from "../assets/academy-hero.png";
import PageHeader from "../components/PageHeader";
import { useResource } from "../hooks/useResource";
import { gallery } from "../utils/fixtures";

export default function Gallery() {
  const { rows } = useResource("/gallery/", gallery);

  return (
    <section className="page-band">
      <div className="container-x">
        <PageHeader
          kicker="Gallery"
          title="Campus and classroom moments"
          description="Gallery items are CMS-managed and can use uploaded images from the backend media system."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {rows.map((item, index) => (
            <article key={item.id || item.title} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <img
                src={item.image || heroImage}
                alt={item.title}
                className={`h-52 w-full object-cover ${index === 1 ? "object-center" : "object-top"}`}
              />
              <div className="p-5">
                <h2 className="font-black text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
