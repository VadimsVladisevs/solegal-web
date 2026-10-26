import type { TeamMember } from "~/content/types";
import type { Variant } from "~/lib/variant";
import { Heading } from "./heading";

interface TeamMemberCardProps {
  member: TeamMember;
  variant: Variant;
}

/** Photo (4:5), role, name and a short bio. */
export function TeamMemberCard({ member, variant }: TeamMemberCardProps) {
  return (
    <article className="flex flex-col gap-2">
      <div
        className={`mb-3 flex aspect-4/5 items-end justify-center overflow-hidden bg-photo-bg ${variant === "c" ? "border-b-3 border-brand" : ""}`}
      >
        {member.photo ? (
          <img
            src={member.photo.src}
            alt={member.photo.alt}
            className="size-full object-cover"
          />
        ) : (
          <PlaceholderPhoto />
        )}
      </div>
      <p className="text-label font-semibold tracking-label text-brand-soft uppercase">
        {member.role}
      </p>
      <Heading level={3}>{member.name}</Heading>
      <p className="text-small text-muted">{member.bio}</p>
    </article>
  );
}

/** A decorative head-and-shoulders silhouette for members without a photo. */
function PlaceholderPhoto() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="w-7/10 fill-photo-fg"
    >
      <circle cx="50" cy="38" r="18" />
      <path d="M12 100 C12 72 30 62 50 62 C70 62 88 72 88 100 Z" />
    </svg>
  );
}
