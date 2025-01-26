import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "TabletSmartphone",
    title: "Mobile Friendly",
    description:
      "Optimized for all devices, ensuring a smooth experience whether you're on a phone, tablet, or desktop.",
  },
  {
    icon: "BadgeCheck",
    title: "Social Proof",
    description:
      "Trusted by users worldwide, showcasing testimonials and success stories to build credibility.",
  },
  {
    icon: "Goal",
    title: "Targeted Content",
    description:
      "Tailored content that speaks directly to your audience, ensuring relevant and engaging messaging.",
  },
  {
    icon: "PictureInPicture",
    title: "Strong Visuals",
    description:
      "Captivating imagery and design elements that enhance user experience and drive engagement.",
  },
  {
    icon: "MousePointerClick",
    title: "Clear CTA",
    description:
      "Effective call-to-actions that guide users seamlessly towards taking the next step.",
  },
  {
    icon: "Newspaper",
    title: "Clear Headline",
    description:
      "Concise and compelling headlines that immediately convey the value of your offering.",
  },
];


export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-2 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        What Makes Us Different
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
        fugiat, odit similique quasi sint reiciendis quidem iure veritatis optio
        facere tenetur.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
