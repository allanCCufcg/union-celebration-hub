
import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC = () => {
  // Data do casamento: 12 de dezembro de 2024
  const weddingDate = new Date('2024-12-12T16:00:00');
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = weddingDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Já passou da data do casamento
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const CountdownUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center rounded-lg shadow-md mb-2">
        <span className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-wedding-navy">
          {value}
        </span>
      </div>
      <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  return (
    <section className="py-16 bg-wedding-rose/20">
      <div className="container-wedding">
        <div className="text-center mb-10">
          <h2 className="heading-md mb-2">Contagem Regressiva</h2>
          <p className="text-muted-foreground">para o nosso grande dia</p>
        </div>

        <div className="flex justify-center gap-3 sm:gap-6">
          <CountdownUnit value={timeLeft.days} label="dias" />
          <div className="flex items-center text-xl md:text-2xl text-wedding-gold font-light">:</div>
          <CountdownUnit value={timeLeft.hours} label="horas" />
          <div className="flex items-center text-xl md:text-2xl text-wedding-gold font-light">:</div>
          <CountdownUnit value={timeLeft.minutes} label="min" />
          <div className="flex items-center text-xl md:text-2xl text-wedding-gold font-light">:</div>
          <CountdownUnit value={timeLeft.seconds} label="seg" />
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg font-playfair">
            <span className="text-wedding-gold font-medium">12 de Dezembro, 2024</span>
            <span className="mx-3">|</span>
            <span>16:00</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
