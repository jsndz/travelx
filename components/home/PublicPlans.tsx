import { getAuthToken } from "@/app/auth";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import OrbitingPlan from "./OrbitingPlan";
import FeaturedPlan from "./FeaturedPlan";

export default async function CommunityPlans() {
  const token = await getAuthToken();
  const res = await fetchQuery(api.plan.getPublicPlans, {}, { token });

  const formatted = res.map((plan: any, i: number) => ({
    _id: plan._id,
    title: plan.nameoftheplace,
    url: plan.imageUrl,
    destination: plan.nameoftheplace || "Unknown Destination",
    duration: plan.duration || "N/A",
    travelers: plan.travelers || 1,
    likes: plan.likes || 0,
    image: plan.imageUrl || "/placeholder.svg",
    author: plan.author || "Anonymous",
    featured: i === 0,
  }));

  const featuredPlan = formatted.find((p) => p.featured);
  const orbitingPlans = formatted.filter((p) => !p.featured);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background/90 py-24">
      {/* Background Rings */}
     
      <div className="pointer-events-none absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#3B82F6]/5 animate-pulse"
            style={{
              width: 300 + i * 150,
              height: 300 + i * 150,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-[#3B82F6]">
            Explore Together
          </span>

          <h2 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            <span className="text-[#3B82F6]">Community</span> Plans
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Discover inspiring journeys crafted by real travelers
          </p>
        </div>

        {/* Orbital Section */}
        <div className="relative mx-auto flex min-h-[600px] max-w-5xl items-center justify-center lg:min-h-[700px]">

          {featuredPlan && <FeaturedPlan plan={featuredPlan} />}

          {orbitingPlans.map((plan, index) => (
            <OrbitingPlan key={plan._id} plan={plan} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/community-plans"
            className="group inline-flex items-center gap-2 text-sm"
          >
            <span className="relative">
              Explore all community plans
              <span className="absolute left-0 -bottom-1 h-px w-full bg-[#3B82F6]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
