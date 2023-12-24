import { useEffect, useState } from "react";

export const useNavbar = () => {
  const [greeting, setGreeting] = useState<string>("Bonjour");
  const [isHovering, setIsHovering] = useState<boolean>(false);



  useEffect(() => {
    const getCurrentGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 6 && currentHour < 12) {
        setGreeting("Bonjour");
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting("Bonjour");
      } else {
        setGreeting("Bonsoir");
      }
    };

    getCurrentGreeting();
    const interval = setInterval(getCurrentGreeting, 60000); // Actualise toutes les minutes

    return () => clearInterval(interval);
  }, []);

  return {
    greeting,
    isHovering,
    setIsHovering,
  };
};
