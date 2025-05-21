import Experience from "@/components/sections/experience";
import Skills from "@/components/sections/skills";

export default function About() {
  return (
    <div className="font-base">
      <h1 className="mb-8 text-2xl font-heading sm:text-4xl">About</h1>

      <div className="mb-10 text-base sm:text-lg">
        <p>
          I&apos;m a software engineer based in NYC. I&apos;m currently a senior
          at Carnegie Mellon University studying Computer Science and Economics.
        </p>
      </div>

      <Skills />

      <Experience />
    </div>
  );
}
