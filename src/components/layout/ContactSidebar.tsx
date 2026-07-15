import { Mail, X } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email Me",
    href: "mailto:yingxinguo.cn@gmail.com",
    desc: "Send feedback",
  },
  {
    icon: X,
    label: "X / Twitter",
    href: "https://x.com/2937684757Free",
    desc: "Follow me",
    external: true,
  },
];

export function ContactSidebar() {
  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 z-40 flex items-center">
      <div className="pointer-events-auto flex flex-col items-center gap-3 pr-3 sm:pr-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2D2D2D]/50">
          Have feedback? Reach out
        </p>
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-3 rounded-2xl border-[2.5px] border-[#2D2D2D] bg-white/80 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:bg-[#FF8FAB]/10 hover:scale-[1.04] hover:-translate-x-1"
            style={{ boxShadow: "3px 4px 0 rgba(0,0,0,0.1)" }}
            title={item.desc}
          >
            <item.icon className="h-4 w-4 shrink-0 text-[#2D2D2D]/70 transition-colors group-hover:text-[#FF8FAB]" />
            <span className="hidden text-xs font-extrabold uppercase tracking-wider text-[#2D2D2D] transition-colors group-hover:text-[#2D2D2D] sm:block">
              {item.label}
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#2D2D2D] transition-colors sm:hidden">
              {/* mobile: icon only */}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
