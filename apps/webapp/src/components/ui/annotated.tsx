import React from "react";

export const AnnotatedSection = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) => {
  return (
    <section className="grid max-w-5xl grid-cols-1 gap-y-4 px-6 md:grid-cols-12 md:gap-x-8 lg:gap-x-16 w-full mx-auto">
      <header className="md:col-span-5 space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>
      <div className="rounded-xl border bg-card text-card-foreground overflow-hidden md:col-span-7">
        {children}
      </div>
    </section>
  );
};
