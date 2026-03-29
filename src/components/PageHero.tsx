interface PageHeroProps {
  badge: string;
  title: string;
  subtitle?: string;
  bgImage?: string;
  tall?: boolean;
}

export function PageHero({ badge, title, subtitle, bgImage, tall }: PageHeroProps) {
  return (
    <section
      className={`relative flex items-center justify-center text-center ${
        tall ? "min-h-[400px] lg:min-h-[400px]" : "min-h-[220px] lg:min-h-[280px]"
      } bg-surface-dark overflow-hidden`}
    >
      {bgImage && (
        <>
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/70 to-surface-dark/50" />
        </>
      )}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <span className="inline-block bg-primary/15 border border-primary text-primary text-sm font-body px-4 py-1.5 rounded-full mb-4">
          {badge}
        </span>
        <h1 className="font-heading font-extrabold text-text-on-dark text-3xl lg:text-5xl mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-text-on-dark-muted text-base lg:text-lg max-w-2xl mx-auto font-body">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
