"use client";

import { FaPinterest, FaTwitter, FaFacebook } from "react-icons/fa";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: "Pinterest",
      icon: FaPinterest,
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
      color: "text-[#E60023]",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "text-[#1DA1F2]",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "text-[#1877F2]",
    },
  ];

  return (
    <div className="my-8 p-6 bg-orange-50 rounded-lg border border-orange-100">
      <p className="text-sm font-semibold text-foreground mb-4">Share this recipe:</p>
      <div className="flex gap-4">
        {shareLinks.map(({ name, icon: Icon, href, color }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full bg-white border border-orange-200 ${color} hover:bg-orange-100 transition-colors`}
            title={`Share on ${name}`}
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
    </div>
  );
}
