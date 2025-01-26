import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Blocks",
    title: "Real-Time Protectiont",
    description:
      "Instantly detect phishing websites and safeguard your personal data.",
  },
  {
    icon: "LineChart",
    title: "User-Friendly Interface:",
    description: "Simple and intuitive design for effortless URL analysis.",
  },
  {
    icon: "Wallet",
    title: "Enhanced Security:",
    description: "Protect yourself from financial loss and identity theft.",
  },
  {
    icon: "Sparkle",
    title: "Peace of Mind:",
    description:
      "Browse the internet with confidence, knowing you're protected.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-2 sm:py-3">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Shortcut to Online Safety
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Protect yourself from phishing threats with ease. Our tool offers
            real-time URL analysis, powered by AI, ensuring you stay one step
            ahead of cybercriminals. Enjoy seamless security with fast, accurate
            detection, all while browsing the web confidently and securely.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
