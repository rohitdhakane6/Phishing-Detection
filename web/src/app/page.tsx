import { BenefitsSection } from "@/components/layout/sections/benefits";
import { ContactSection } from "@/components/layout/sections/contact";
import { FeaturesSection } from "@/components/layout/sections/features";
import { HeroSection } from "@/components/layout/sections/hero";
// import { PricingSection } from "@/components/layout/sections/pricing";
// import { ServicesSection } from "@/components/layout/sections/services";
// import { SponsorsSection } from "@/components/layout/sections/sponsors";
// import { TeamSection } from "@/components/layout/sections/team";
// import { TestimonialSection } from "@/components/layout/sections/testimonial";
// import { FooterSection } from "@/components/layout/sections/footer";
// import { FAQSection } from "@/components/layout/sections/faq";
// import { CommunitySection } from "@/components/layout/sections/community";



export const metadata = {
  title: "Check Phish - Check if a website is a phishing site",
  description: "Check Phish is a free tool to check if a website is a phishing site",
  openGraph: {
    type: "website",
    url: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Shadcn - Landing template",
    description: "Free Shadcn landing page for developers",
    images: [
      {
        url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
        width: 1200,
        height: 630,
        alt: "Shadcn - Landing template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Shadcn - Landing template",
    description: "Free Shadcn landing page for developers",
    images: [
      "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
    ],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <SponsorsSection /> */}
      <BenefitsSection />
      <FeaturesSection />
      {/* <ServicesSection /> */}
      {/* <TestimonialSection /> */}
      {/* <TeamSection /> */}
      {/* <CommunitySection /> */}
      {/* <PricingSection /> */}
      <ContactSection />
      {/* <FAQSection /> */}
      {/* <FooterSection /> */}
    </>
  );
}
