import { ButtonLink } from "@/components/button/button-link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import PROJECTS from "@/data/projects";
import Image from "next/image";

export default function Projects() {
  return (
    <div>
      <h1 className="font-heading mb-8 text-2xl sm:text-4xl">Projects</h1>

      <div className="flex flex-col gap-5">
        {PROJECTS.map((project, id) => {
          return (
            <div
              className="border-border shadow-shadow rounded-base bg-main border-2 p-4 sm:p-5"
              key={id}
            >
              <AspectRatio
                className="border-border shadow-shadow rounded-base -bottom-[2px]! border-2"
                ratio={71 / 26}
              >
                <Image
                  className="rounded-base w-full"
                  src={`${project.previewImage}`}
                  alt={project.name}
                  width={1000}
                  height={1000}
                />
              </AspectRatio>

              <div className="text-main-foreground font-base mt-5">
                <h2 className="font-heading text-xl sm:text-2xl">
                  {project.name}
                </h2>

                <p className="mt-2">{project.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-5">
                  <ButtonLink href={project.liveLink}>
                    Visit
                  </ButtonLink>
                  <ButtonLink href={project.repoUrl}>
                    Github
                  </ButtonLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
