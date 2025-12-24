import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Bell } from "lucide-react";

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const options = [
    {
      key: "email" as const,
      icon: Mail,
      title: "Email Updates",
      description: "New collections, exclusive offers, and brand news",
    },
    {
      key: "sms" as const,
      icon: MessageSquare,
      title: "SMS Notifications",
      description: "Flash sales and time-sensitive updates",
    },
    {
      key: "push" as const,
      icon: Bell,
      title: "Push Notifications",
      description: "Real-time alerts for drops and restocks",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide mb-4">
            Stay Connected
          </h2>
          <p className="text-muted-foreground text-sm tracking-wider">
            Manage your notification preferences
          </p>
        </div>

        {/* Preferences */}
        <div className="space-y-6">
          {options.map((option) => (
            <div
              key={option.key}
              className="flex items-center justify-between p-6 border border-border/30 rounded bg-card/50 hover:border-border/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded bg-secondary">
                  <option.icon className="w-5 h-5 text-foreground/70" />
                </div>
                <div>
                  <Label className="text-base font-medium cursor-pointer">
                    {option.title}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences[option.key]}
                onCheckedChange={() => togglePreference(option.key)}
                className="data-[state=checked]:bg-foreground"
              />
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-xs text-center text-muted-foreground mt-8">
          You can update your preferences at any time. We respect your privacy.
        </p>
      </div>
    </section>
  );
};

export default NotificationPreferences;
